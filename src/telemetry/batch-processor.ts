/**
 * Batch Processor for Telemetry
 * Handles batching, queuing, and sending telemetry data to Supabase
 */

import { SupabaseClient } from '@supabase/supabase-js';
import { TelemetryEvent, WorkflowTelemetry, TELEMETRY_CONFIG, TelemetryMetrics } from './telemetry-types';
import { TelemetryError, TelemetryErrorType, TelemetryCircuitBreaker } from './telemetry-error';
import { logger } from '../utils/logger';

export class TelemetryBatchProcessor {
  private flushTimer?: NodeJS.Timeout;
  private isFlushingEvents: boolean = false;
  private isFlushingWorkflows: boolean = false;
  private circuitBreaker: TelemetryCircuitBreaker;
  private metrics: TelemetryMetrics = {
    eventsTracked: 0,
    eventsDropped: 0,
    eventsFailed: 0,
    batchesSent: 0,
    batchesFailed: 0,
    averageFlushTime: 0,
    rateLimitHits: 0
  };
  private flushTimes: number[] = [];
  private deadLetterQueue: (TelemetryEvent | WorkflowTelemetry)[] = [];
  private readonly maxDeadLetterSize = 100;

  constructor(
    private supabase: SupabaseClient | null,
    private isEnabled: () => boolean
  ) {
    this.circuitBreaker = new TelemetryCircuitBreaker();
  }

  /**
   * Start the batch processor
   */
  start(): void {
    if (!this.isEnabled() || !this.supabase) return;

    // Set up periodic flushing
    this.flushTimer = setInterval(() => {
      this.flush();
    }, TELEMETRY_CONFIG.BATCH_FLUSH_INTERVAL);

    // Prevent timer from keeping process alive
    // In tests, flushTimer might be a number instead of a Timer object
    if (typeof this.flushTimer === 'object' && 'unref' in this.flushTimer) {
      this.flushTimer.unref();
    }

    // Set up process exit handlers
    process.on('beforeExit', () => this.flush());
    process.on('SIGINT', () => {
      this.flush();
      process.exit(0);
    });
    process.on('SIGTERM', () => {
      this.flush();
      process.exit(0);
    });

    logger.debug('Telemetry batch processor started');
  }

  /**
   * Stop the batch processor
   */
  stop(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = undefined;
    }
    logger.debug('Telemetry batch processor stopped');
  }

  /**
   * Flush events and workflows to Supabase
   */
  async flush(events?: TelemetryEvent[], workflows?: WorkflowTelemetry[]): Promise<void> {
    if (!this.isEnabled() || !this.supabase) return;

    // Check circuit breaker
    if (!this.circuitBreaker.shouldAllow()) {
      logger.debug('Circuit breaker open - skipping flush');
      this.metrics.eventsDropped += (events?.length || 0) + (workflows?.length || 0);
      return;
    }

    const startTime = Date.now();
    let hasErrors = false;

    // Flush events if provided
    if (events && events.length > 0) {
      hasErrors = !(await this.flushEvents(events)) || hasErrors;
    }

    // Flush workflows if provided
    if (workflows && workflows.length > 0) {
      hasErrors = !(await this.flushWorkflows(workflows)) || hasErrors;
    }

    // Record flush time
    const flushTime = Date.now() - startTime;
    this.recordFlushTime(flushTime);

    // Update circuit breaker
    if (hasErrors) {
      this.circuitBreaker.recordFailure();
    } else {
      this.circuitBreaker.recordSuccess();
    }

    // Process dead letter queue if circuit is healthy
    if (!hasErrors && this.deadLetterQueue.length > 0) {
      await this.processDeadLetterQueue();
    }
  }

  /**
   * Flush events with batching
   */
  private async flushEvents(events: TelemetryEvent[]): Promise<boolean> {
    if (this.isFlushingEvents || events.length === 0) return true;

    this.isFlushingEvents = true;

    try {
      // Batch events
      const batches = this.createBatches(events, TELEMETRY_CONFIG.MAX_BATCH_SIZE);

      for (const batch of batches) {
        const result = await this.executeWithRetry(async () => {
          const { error } = await this.supabase!
            .from('telemetry_events')
            .insert(batch);

          if (error) {
            throw error;
          }

          logger.debug(`Flushed batch of ${batch.length} telemetry events`);
          return true;
        }, 'Flush telemetry events');

        if (result) {
          this.metrics.eventsTracked += batch.length;
          this.metrics.batchesSent++;
        } else {
          this.metrics.eventsFailed += batch.length;
          this.metrics.batchesFailed++;
          this.addToDeadLetterQueue(batch);
          return false;
        }
      }

      return true;
    } catch (error) {
      logger.debug('Failed to flush events:', error);
      throw new TelemetryError(
        TelemetryErrorType.NETWORK_ERROR,
        'Failed to flush events',
        { error: error instanceof Error ? error.message : String(error) },
        true
      );
    } finally {
      this.isFlushingEvents = false;
    }
  }

  /**
   * Flush workflows with deduplication
   */
  private async flushWorkflows(workflows: WorkflowTelemetry[]): Promise<boolean> {
    if (this.isFlushingWorkflows || workflows.length === 0) return true;

    this.isFlushingWorkflows = true;

    try {
      // Deduplicate workflows by hash
      const uniqueWorkflows = this.deduplicateWorkflows(workflows);
      logger.debug(`Deduplicating workflows: ${workflows.length} -> ${uniqueWorkflows.length}`);

      // Batch workflows
      const batches = this.createBatches(uniqueWorkflows, TELEMETRY_CONFIG.MAX_BATCH_SIZE);

      for (const batch of batches) {
        const result = await this.executeWithRetry(async () => {
          const { error } = await this.supabase!
            .from('telemetry_workflows')
            .insert(batch);

          if (error) {
            throw error;
          }

          logger.debug(`Flushed batch of ${batch.length} telemetry workflows`);
          return true;
        }, 'Flush telemetry workflows');

        if (result) {
          this.metrics.eventsTracked += batch.length;
          this.metrics.batchesSent++;
        } else {
          this.metrics.eventsFailed += batch.length;
          this.metrics.batchesFailed++;
          this.addToDeadLetterQueue(batch);
          return false;
        }
      }

      return true;
    } catch (error) {
      logger.debug('Failed to flush workflows:', error);
      throw new TelemetryError(
        TelemetryErrorType.NETWORK_ERROR,
        'Failed to flush workflows',
        { error: error instanceof Error ? error.message : String(error) },
        true
      );
    } finally {
      this.isFlushingWorkflows = false;
    }
  }

  /**
   * Execute operation with exponential backoff retry
   */
  private async executeWithRetry<T>(
    operation: () => Promise<T>,
    operationName: string
  ): Promise<T | null> {
    let lastError: Error | null = null;
    let delay = TELEMETRY_CONFIG.RETRY_DELAY;

    for (let attempt = 1; attempt <= TELEMETRY_CONFIG.MAX_RETRIES; attempt++) {
      try {
        // In test environment, execute without timeout but still handle errors
        if (process.env.NODE_ENV === 'test' && process.env.VITEST) {
          const result = await operation();
          return result;
        }

        // Create a timeout promise
        const timeoutPromise = new Promise<never>((_, reject) => {
          setTimeout(() => reject(new Error('Operation timed out')), TELEMETRY_CONFIG.OPERATION_TIMEOUT);
        });

        // Race between operation and timeout
        const result = await Promise.race([operation(), timeoutPromise]) as T;
        return result;
      } catch (error) {
        lastError = error as Error;
        logger.debug(`${operationName} attempt ${attempt} failed:`, error);

        if (attempt < TELEMETRY_CONFIG.MAX_RETRIES) {
          // Skip delay in test environment when using fake timers
          if (!(process.env.NODE_ENV === 'test' && process.env.VITEST)) {
            // Exponential backoff with jitter
            const jitter = Math.random() * 0.3 * delay; // 30% jitter
            const waitTime = delay + jitter;
            await new Promise(resolve => setTimeout(resolve, waitTime));
            delay *= 2; // Double the delay for next attempt
          }
          // In test mode, continue to next retry attempt without delay
        }
      }
    }

    logger.debug(`${operationName} failed after ${TELEMETRY_CONFIG.MAX_RETRIES} attempts:`, lastError);
    return null;
  }

  /**
   * Create batches from array
   */
  private createBatches<T>(items: T[], batchSize: number): T[][] {
    const batches: T[][] = [];

    for (let i = 0; i < items.length; i += batchSize) {
      batches.push(items.slice(i, i + batchSize));
    }

    return batches;
  }

  /**
   * Deduplicate workflows by hash
   */
  private deduplicateWorkflows(workflows: WorkflowTelemetry[]): WorkflowTelemetry[] {
    const seen = new Set<string>();
    const unique: WorkflowTelemetry[] = [];

    for (const workflow of workflows) {
      if (!seen.has(workflow.workflow_hash)) {
        seen.add(workflow.workflow_hash);
        unique.push(workflow);
      }
    }

    return unique;
  }

  /**
   * Add failed items to dead letter queue
   */
  private addToDeadLetterQueue(items: (TelemetryEvent | WorkflowTelemetry)[]): void {
    for (const item of items) {
      this.deadLetterQueue.push(item);

      // Maintain max size
      if (this.deadLetterQueue.length > this.maxDeadLetterSize) {
        const dropped = this.deadLetterQueue.shift();
        if (dropped) {
          this.metrics.eventsDropped++;
        }
      }
    }

    logger.debug(`Added ${items.length} items to dead letter queue`);
  }

  /**
   * Process dead letter queue when circuit is healthy
   */
  private async processDeadLetterQueue(): Promise<void> {
    if (this.deadLetterQueue.length === 0) return;

    logger.debug(`Processing ${this.deadLetterQueue.length} items from dead letter queue`);

    const events: TelemetryEvent[] = [];
    const workflows: WorkflowTelemetry[] = [];

    // Separate events and workflows
    for (const item of this.deadLetterQueue) {
      if ('workflow_hash' in item) {
        workflows.push(item as WorkflowTelemetry);
      } else {
        events.push(item as TelemetryEvent);
      }
    }

    // Clear dead letter queue
    this.deadLetterQueue = [];

    // Try to flush
    if (events.length > 0) {
      await this.flushEvents(events);
    }
    if (workflows.length > 0) {
      await this.flushWorkflows(workflows);
    }
  }

  /**
   * Record flush time for metrics
   */
  private recordFlushTime(time: number): void {
    this.flushTimes.push(time);

    // Keep last 100 flush times
    if (this.flushTimes.length > 100) {
      this.flushTimes.shift();
    }

    // Update average
    const sum = this.flushTimes.reduce((a, b) => a + b, 0);
    this.metrics.averageFlushTime = Math.round(sum / this.flushTimes.length);
    this.metrics.lastFlushTime = time;
  }

  /**
   * Get processor metrics
   */
  getMetrics(): TelemetryMetrics & { circuitBreakerState: any; deadLetterQueueSize: number } {
    return {
      ...this.metrics,
      circuitBreakerState: this.circuitBreaker.getState(),
      deadLetterQueueSize: this.deadLetterQueue.length
    };
  }

  /**
   * Reset metrics
   */
  resetMetrics(): void {
    this.metrics = {
      eventsTracked: 0,
      eventsDropped: 0,
      eventsFailed: 0,
      batchesSent: 0,
      batchesFailed: 0,
      averageFlushTime: 0,
      rateLimitHits: 0
    };
    this.flushTimes = [];
    this.circuitBreaker.reset();
  }
}