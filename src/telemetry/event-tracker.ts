/**
 * Event Tracker for Telemetry
 * Handles all event tracking logic extracted from TelemetryManager
 */

import { TelemetryEvent, WorkflowTelemetry } from './telemetry-types';
import { WorkflowSanitizer } from './workflow-sanitizer';
import { TelemetryRateLimiter } from './rate-limiter';
import { TelemetryEventValidator } from './event-validator';
import { TelemetryError, TelemetryErrorType } from './telemetry-error';
import { logger } from '../utils/logger';
import { existsSync, readFileSync } from 'fs';
import { resolve } from 'path';

export class TelemetryEventTracker {
  private rateLimiter: TelemetryRateLimiter;
  private validator: TelemetryEventValidator;
  private eventQueue: TelemetryEvent[] = [];
  private workflowQueue: WorkflowTelemetry[] = [];
  private previousTool?: string;
  private previousToolTimestamp: number = 0;
  private performanceMetrics: Map<string, number[]> = new Map();

  constructor(
    private getUserId: () => string,
    private isEnabled: () => boolean
  ) {
    this.rateLimiter = new TelemetryRateLimiter();
    this.validator = new TelemetryEventValidator();
  }

  /**
   * Track a tool usage event
   */
  trackToolUsage(toolName: string, success: boolean, duration?: number): void {
    if (!this.isEnabled()) return;

    // Check rate limit
    if (!this.rateLimiter.allow()) {
      logger.debug(`Rate limited: tool_used event for ${toolName}`);
      return;
    }

    // Track performance metrics
    if (duration !== undefined) {
      this.recordPerformanceMetric(toolName, duration);
    }

    const event: TelemetryEvent = {
      user_id: this.getUserId(),
      event: 'tool_used',
      properties: {
        tool: toolName.replace(/[^a-zA-Z0-9_-]/g, '_'),
        success,
        duration: duration || 0,
      }
    };

    // Validate and queue
    const validated = this.validator.validateEvent(event);
    if (validated) {
      this.eventQueue.push(validated);
    }
  }

  /**
   * Track workflow creation
   */
  async trackWorkflowCreation(workflow: any, validationPassed: boolean): Promise<void> {
    if (!this.isEnabled()) return;

    // Check rate limit
    if (!this.rateLimiter.allow()) {
      logger.debug('Rate limited: workflow creation event');
      return;
    }

    // Only store workflows that pass validation
    if (!validationPassed) {
      this.trackEvent('workflow_validation_failed', {
        nodeCount: workflow.nodes?.length || 0,
      });
      return;
    }

    try {
      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      const telemetryData: WorkflowTelemetry = {
        user_id: this.getUserId(),
        workflow_hash: sanitized.workflowHash,
        node_count: sanitized.nodeCount,
        node_types: sanitized.nodeTypes,
        has_trigger: sanitized.hasTrigger,
        has_webhook: sanitized.hasWebhook,
        complexity: sanitized.complexity,
        sanitized_workflow: {
          nodes: sanitized.nodes,
          connections: sanitized.connections,
        },
      };

      // Validate workflow telemetry
      const validated = this.validator.validateWorkflow(telemetryData);
      if (validated) {
        this.workflowQueue.push(validated);

        // Also track as event
        this.trackEvent('workflow_created', {
          nodeCount: sanitized.nodeCount,
          nodeTypes: sanitized.nodeTypes.length,
          complexity: sanitized.complexity,
          hasTrigger: sanitized.hasTrigger,
          hasWebhook: sanitized.hasWebhook,
        });
      }
    } catch (error) {
      logger.debug('Failed to track workflow creation:', error);
      throw new TelemetryError(
        TelemetryErrorType.VALIDATION_ERROR,
        'Failed to sanitize workflow',
        { error: error instanceof Error ? error.message : String(error) }
      );
    }
  }

  /**
   * Track an error event
   */
  trackError(errorType: string, context: string, toolName?: string): void {
    if (!this.isEnabled()) return;

    // Don't rate limit error tracking - we want to see all errors
    this.trackEvent('error_occurred', {
      errorType: this.sanitizeErrorType(errorType),
      context: this.sanitizeContext(context),
      tool: toolName ? toolName.replace(/[^a-zA-Z0-9_-]/g, '_') : undefined,
    }, false); // Skip rate limiting for errors
  }

  /**
   * Track a generic event
   */
  trackEvent(eventName: string, properties: Record<string, any>, checkRateLimit: boolean = true): void {
    if (!this.isEnabled()) return;

    // Check rate limit unless explicitly skipped
    if (checkRateLimit && !this.rateLimiter.allow()) {
      logger.debug(`Rate limited: ${eventName} event`);
      return;
    }

    const event: TelemetryEvent = {
      user_id: this.getUserId(),
      event: eventName,
      properties,
    };

    // Validate and queue
    const validated = this.validator.validateEvent(event);
    if (validated) {
      this.eventQueue.push(validated);
    }
  }

  /**
   * Track session start
   */
  trackSessionStart(): void {
    if (!this.isEnabled()) return;

    this.trackEvent('session_start', {
      version: this.getPackageVersion(),
      platform: process.platform,
      arch: process.arch,
      nodeVersion: process.version,
    });
  }

  /**
   * Track search queries
   */
  trackSearchQuery(query: string, resultsFound: number, searchType: string): void {
    if (!this.isEnabled()) return;

    this.trackEvent('search_query', {
      query: query.substring(0, 100),
      resultsFound,
      searchType,
      hasResults: resultsFound > 0,
      isZeroResults: resultsFound === 0
    });
  }

  /**
   * Track validation details
   */
  trackValidationDetails(nodeType: string, errorType: string, details: Record<string, any>): void {
    if (!this.isEnabled()) return;

    this.trackEvent('validation_details', {
      nodeType: nodeType.replace(/[^a-zA-Z0-9_.-]/g, '_'),
      errorType: this.sanitizeErrorType(errorType),
      errorCategory: this.categorizeError(errorType),
      details
    });
  }

  /**
   * Track tool usage sequences
   */
  trackToolSequence(previousTool: string, currentTool: string, timeDelta: number): void {
    if (!this.isEnabled()) return;

    this.trackEvent('tool_sequence', {
      previousTool: previousTool.replace(/[^a-zA-Z0-9_-]/g, '_'),
      currentTool: currentTool.replace(/[^a-zA-Z0-9_-]/g, '_'),
      timeDelta: Math.min(timeDelta, 300000), // Cap at 5 minutes
      isSlowTransition: timeDelta > 10000,
      sequence: `${previousTool}->${currentTool}`
    });
  }

  /**
   * Track node configuration patterns
   */
  trackNodeConfiguration(nodeType: string, propertiesSet: number, usedDefaults: boolean): void {
    if (!this.isEnabled()) return;

    this.trackEvent('node_configuration', {
      nodeType: nodeType.replace(/[^a-zA-Z0-9_.-]/g, '_'),
      propertiesSet,
      usedDefaults,
      complexity: this.categorizeConfigComplexity(propertiesSet)
    });
  }

  /**
   * Track performance metrics
   */
  trackPerformanceMetric(operation: string, duration: number, metadata?: Record<string, any>): void {
    if (!this.isEnabled()) return;

    // Record for internal metrics
    this.recordPerformanceMetric(operation, duration);

    this.trackEvent('performance_metric', {
      operation: operation.replace(/[^a-zA-Z0-9_-]/g, '_'),
      duration,
      isSlow: duration > 1000,
      isVerySlow: duration > 5000,
      metadata
    });
  }

  /**
   * Update tool sequence tracking
   */
  updateToolSequence(toolName: string): void {
    if (this.previousTool) {
      const timeDelta = Date.now() - this.previousToolTimestamp;
      this.trackToolSequence(this.previousTool, toolName, timeDelta);
    }

    this.previousTool = toolName;
    this.previousToolTimestamp = Date.now();
  }

  /**
   * Get queued events
   */
  getEventQueue(): TelemetryEvent[] {
    return [...this.eventQueue];
  }

  /**
   * Get queued workflows
   */
  getWorkflowQueue(): WorkflowTelemetry[] {
    return [...this.workflowQueue];
  }

  /**
   * Clear event queue
   */
  clearEventQueue(): void {
    this.eventQueue = [];
  }

  /**
   * Clear workflow queue
   */
  clearWorkflowQueue(): void {
    this.workflowQueue = [];
  }

  /**
   * Get tracking statistics
   */
  getStats() {
    return {
      rateLimiter: this.rateLimiter.getStats(),
      validator: this.validator.getStats(),
      eventQueueSize: this.eventQueue.length,
      workflowQueueSize: this.workflowQueue.length,
      performanceMetrics: this.getPerformanceStats()
    };
  }

  /**
   * Record performance metric internally
   */
  private recordPerformanceMetric(operation: string, duration: number): void {
    if (!this.performanceMetrics.has(operation)) {
      this.performanceMetrics.set(operation, []);
    }

    const metrics = this.performanceMetrics.get(operation)!;
    metrics.push(duration);

    // Keep only last 100 measurements
    if (metrics.length > 100) {
      metrics.shift();
    }
  }

  /**
   * Get performance statistics
   */
  private getPerformanceStats() {
    const stats: Record<string, any> = {};

    for (const [operation, durations] of this.performanceMetrics.entries()) {
      if (durations.length === 0) continue;

      const sorted = [...durations].sort((a, b) => a - b);
      const sum = sorted.reduce((a, b) => a + b, 0);

      stats[operation] = {
        count: sorted.length,
        min: sorted[0],
        max: sorted[sorted.length - 1],
        avg: Math.round(sum / sorted.length),
        p50: sorted[Math.floor(sorted.length * 0.5)],
        p95: sorted[Math.floor(sorted.length * 0.95)],
        p99: sorted[Math.floor(sorted.length * 0.99)]
      };
    }

    return stats;
  }

  /**
   * Categorize error types
   */
  private categorizeError(errorType: string): string {
    const lowerError = errorType.toLowerCase();
    if (lowerError.includes('type')) return 'type_error';
    if (lowerError.includes('validation')) return 'validation_error';
    if (lowerError.includes('required')) return 'required_field_error';
    if (lowerError.includes('connection')) return 'connection_error';
    if (lowerError.includes('expression')) return 'expression_error';
    return 'other_error';
  }

  /**
   * Categorize configuration complexity
   */
  private categorizeConfigComplexity(propertiesSet: number): string {
    if (propertiesSet === 0) return 'defaults_only';
    if (propertiesSet <= 3) return 'simple';
    if (propertiesSet <= 10) return 'moderate';
    return 'complex';
  }

  /**
   * Get package version
   */
  private getPackageVersion(): string {
    try {
      const possiblePaths = [
        resolve(__dirname, '..', '..', 'package.json'),
        resolve(process.cwd(), 'package.json'),
        resolve(__dirname, '..', '..', '..', 'package.json')
      ];

      for (const packagePath of possiblePaths) {
        if (existsSync(packagePath)) {
          const packageJson = JSON.parse(readFileSync(packagePath, 'utf-8'));
          if (packageJson.version) {
            return packageJson.version;
          }
        }
      }

      return 'unknown';
    } catch (error) {
      logger.debug('Failed to get package version:', error);
      return 'unknown';
    }
  }

  /**
   * Sanitize error type
   */
  private sanitizeErrorType(errorType: string): string {
    return errorType.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 50);
  }

  /**
   * Sanitize context
   */
  private sanitizeContext(context: string): string {
    // Sanitize in a specific order to preserve some structure
    let sanitized = context
      // First replace emails (before URLs eat them)
      .replace(/[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g, '[EMAIL]')
      // Then replace long keys (32+ chars to match validator)
      .replace(/\b[a-zA-Z0-9_-]{32,}/g, '[KEY]')
      // Finally replace URLs but keep the path structure
      .replace(/(https?:\/\/)([^\s\/]+)(\/[^\s]*)?/gi, (match, protocol, domain, path) => {
        return '[URL]' + (path || '');
      });

    // Then truncate if needed
    if (sanitized.length > 100) {
      sanitized = sanitized.substring(0, 100);
    }
    return sanitized;
  }
}