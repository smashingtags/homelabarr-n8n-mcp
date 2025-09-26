import { describe, it, expect, beforeEach, vi, afterEach } from 'vitest';
import { TelemetryEventTracker } from '../../../src/telemetry/event-tracker';
import { TelemetryEvent, WorkflowTelemetry } from '../../../src/telemetry/telemetry-types';
import { TelemetryError, TelemetryErrorType } from '../../../src/telemetry/telemetry-error';
import { WorkflowSanitizer } from '../../../src/telemetry/workflow-sanitizer';
import { existsSync } from 'fs';

// Mock dependencies
vi.mock('../../../src/utils/logger', () => ({
  logger: {
    debug: vi.fn(),
    info: vi.fn(),
    warn: vi.fn(),
    error: vi.fn(),
  }
}));

vi.mock('../../../src/telemetry/workflow-sanitizer');
vi.mock('fs');
vi.mock('path');

describe('TelemetryEventTracker', () => {
  let eventTracker: TelemetryEventTracker;
  let mockGetUserId: ReturnType<typeof vi.fn>;
  let mockIsEnabled: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockGetUserId = vi.fn().mockReturnValue('test-user-123');
    mockIsEnabled = vi.fn().mockReturnValue(true);
    eventTracker = new TelemetryEventTracker(mockGetUserId, mockIsEnabled);
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('trackToolUsage()', () => {
    it('should track successful tool usage', () => {
      eventTracker.trackToolUsage('httpRequest', true, 500);

      const events = eventTracker.getEventQueue();
      expect(events).toHaveLength(1);
      expect(events[0]).toMatchObject({
        user_id: 'test-user-123',
        event: 'tool_used',
        properties: {
          tool: 'httpRequest',
          success: true,
          duration: 500
        }
      });
    });

    it('should track failed tool usage', () => {
      eventTracker.trackToolUsage('invalidNode', false);

      const events = eventTracker.getEventQueue();
      expect(events).toHaveLength(1);
      expect(events[0]).toMatchObject({
        user_id: 'test-user-123',
        event: 'tool_used',
        properties: {
          tool: 'invalidNode',
          success: false,
          duration: 0
        }
      });
    });

    it('should sanitize tool names', () => {
      eventTracker.trackToolUsage('tool-with-special!@#chars', true);

      const events = eventTracker.getEventQueue();
      expect(events[0].properties.tool).toBe('tool-with-special___chars');
    });

    it('should not track when disabled', () => {
      mockIsEnabled.mockReturnValue(false);
      eventTracker.trackToolUsage('httpRequest', true);

      const events = eventTracker.getEventQueue();
      expect(events).toHaveLength(0);
    });

    it('should respect rate limiting', () => {
      // Mock rate limiter to deny requests
      vi.spyOn(eventTracker['rateLimiter'], 'allow').mockReturnValue(false);

      eventTracker.trackToolUsage('httpRequest', true);

      const events = eventTracker.getEventQueue();
      expect(events).toHaveLength(0);
    });

    it('should record performance metrics internally', () => {
      eventTracker.trackToolUsage('slowTool', true, 2000);
      eventTracker.trackToolUsage('slowTool', true, 3000);

      const stats = eventTracker.getStats();
      expect(stats.performanceMetrics.slowTool).toBeDefined();
      expect(stats.performanceMetrics.slowTool.count).toBe(2);
      expect(stats.performanceMetrics.slowTool.avg).toBeGreaterThan(2000);
    });
  });

  describe('trackWorkflowCreation()', () => {
    const mockWorkflow = {
      nodes: [
        { id: '1', type: 'webhook', name: 'Webhook', position: [0, 0] as [number, number], parameters: {} },
        { id: '2', type: 'httpRequest', name: 'HTTP Request', position: [100, 0] as [number, number], parameters: {} },
        { id: '3', type: 'set', name: 'Set', position: [200, 0] as [number, number], parameters: {} }
      ],
      connections: {
        '1': { main: [[{ node: '2', type: 'main', index: 0 }]] }
      }
    };

    beforeEach(() => {
      const mockSanitized = {
        workflowHash: 'hash123',
        nodeCount: 3,
        nodeTypes: ['webhook', 'httpRequest', 'set'],
        hasTrigger: true,
        hasWebhook: true,
        complexity: 'medium' as const,
        nodes: mockWorkflow.nodes,
        connections: mockWorkflow.connections
      };

      vi.mocked(WorkflowSanitizer.sanitizeWorkflow).mockReturnValue(mockSanitized);
    });

    it('should track valid workflow creation', async () => {
      await eventTracker.trackWorkflowCreation(mockWorkflow, true);

      const workflows = eventTracker.getWorkflowQueue();
      const events = eventTracker.getEventQueue();

      expect(workflows).toHaveLength(1);
      expect(workflows[0]).toMatchObject({
        user_id: 'test-user-123',
        workflow_hash: 'hash123',
        node_count: 3,
        node_types: ['webhook', 'httpRequest', 'set'],
        has_trigger: true,
        has_webhook: true,
        complexity: 'medium'
      });

      expect(events).toHaveLength(1);
      expect(events[0].event).toBe('workflow_created');
    });

    it('should track failed validation without storing workflow', async () => {
      await eventTracker.trackWorkflowCreation(mockWorkflow, false);

      const workflows = eventTracker.getWorkflowQueue();
      const events = eventTracker.getEventQueue();

      expect(workflows).toHaveLength(0);
      expect(events).toHaveLength(1);
      expect(events[0].event).toBe('workflow_validation_failed');
    });

    it('should not track when disabled', async () => {
      mockIsEnabled.mockReturnValue(false);
      await eventTracker.trackWorkflowCreation(mockWorkflow, true);

      expect(eventTracker.getWorkflowQueue()).toHaveLength(0);
      expect(eventTracker.getEventQueue()).toHaveLength(0);
    });

    it('should handle sanitization errors', async () => {
      vi.mocked(WorkflowSanitizer.sanitizeWorkflow).mockImplementation(() => {
        throw new Error('Sanitization failed');
      });

      await expect(eventTracker.trackWorkflowCreation(mockWorkflow, true))
        .rejects.toThrow(TelemetryError);
    });

    it('should respect rate limiting', async () => {
      vi.spyOn(eventTracker['rateLimiter'], 'allow').mockReturnValue(false);

      await eventTracker.trackWorkflowCreation(mockWorkflow, true);

      expect(eventTracker.getWorkflowQueue()).toHaveLength(0);
      expect(eventTracker.getEventQueue()).toHaveLength(0);
    });
  });

  describe('trackError()', () => {
    it('should track error events without rate limiting', () => {
      eventTracker.trackError('ValidationError', 'Node configuration invalid', 'httpRequest');

      const events = eventTracker.getEventQueue();
      expect(events).toHaveLength(1);
      expect(events[0]).toMatchObject({
        user_id: 'test-user-123',
        event: 'error_occurred',
        properties: {
          errorType: 'ValidationError',
          context: 'Node configuration invalid',
          tool: 'httpRequest'
        }
      });
    });

    it('should sanitize error context', () => {
      const context = 'Failed to connect to https://api.example.com with key abc123def456ghi789jklmno0123456789';
      eventTracker.trackError('NetworkError', context);

      const events = eventTracker.getEventQueue();
      expect(events[0].properties.context).toBe('Failed to connect to [URL] with key [KEY]');
    });

    it('should sanitize error type', () => {
      eventTracker.trackError('Invalid$Error!Type', 'test context');

      const events = eventTracker.getEventQueue();
      expect(events[0].properties.errorType).toBe('Invalid_Error_Type');
    });

    it('should handle missing tool name', () => {
      eventTracker.trackError('TestError', 'test context');

      const events = eventTracker.getEventQueue();
      expect(events[0].properties.tool).toBeNull();  // Validator converts undefined to null
    });
  });

  describe('trackEvent()', () => {
    it('should track generic events', () => {
      const properties = { key: 'value', count: 42 };
      eventTracker.trackEvent('custom_event', properties);

      const events = eventTracker.getEventQueue();
      expect(events).toHaveLength(1);
      expect(events[0].user_id).toBe('test-user-123');
      expect(events[0].event).toBe('custom_event');
      expect(events[0].properties).toEqual(properties);
    });

    it('should respect rate limiting by default', () => {
      vi.spyOn(eventTracker['rateLimiter'], 'allow').mockReturnValue(false);

      eventTracker.trackEvent('rate_limited_event', {});

      expect(eventTracker.getEventQueue()).toHaveLength(0);
    });

    it('should skip rate limiting when requested', () => {
      vi.spyOn(eventTracker['rateLimiter'], 'allow').mockReturnValue(false);

      eventTracker.trackEvent('critical_event', {}, false);

      const events = eventTracker.getEventQueue();
      expect(events).toHaveLength(1);
      expect(events[0].event).toBe('critical_event');
    });
  });

  describe('trackSessionStart()', () => {
    beforeEach(() => {
      // Mock existsSync and readFileSync for package.json reading
      vi.mocked(existsSync).mockReturnValue(true);
      const mockReadFileSync = vi.fn().mockReturnValue(JSON.stringify({ version: '1.2.3' }));
      vi.doMock('fs', () => ({ existsSync: vi.mocked(existsSync), readFileSync: mockReadFileSync }));
    });

    it('should track session start with system info', () => {
      eventTracker.trackSessionStart();

      const events = eventTracker.getEventQueue();
      expect(events).toHaveLength(1);
      expect(events[0]).toMatchObject({
        event: 'session_start',
        properties: {
          platform: process.platform,
          arch: process.arch,
          nodeVersion: process.version
        }
      });
    });
  });

  describe('trackSearchQuery()', () => {
    it('should track search queries with results', () => {
      eventTracker.trackSearchQuery('httpRequest nodes', 5, 'nodes');

      const events = eventTracker.getEventQueue();
      expect(events).toHaveLength(1);
      expect(events[0]).toMatchObject({
        event: 'search_query',
        properties: {
          query: 'httpRequest nodes',
          resultsFound: 5,
          searchType: 'nodes',
          hasResults: true,
          isZeroResults: false
        }
      });
    });

    it('should track zero result queries', () => {
      eventTracker.trackSearchQuery('nonexistent node', 0, 'nodes');

      const events = eventTracker.getEventQueue();
      expect(events[0].properties.hasResults).toBe(false);
      expect(events[0].properties.isZeroResults).toBe(true);
    });

    it('should truncate long queries', () => {
      const longQuery = 'a'.repeat(150);
      eventTracker.trackSearchQuery(longQuery, 1, 'nodes');

      const events = eventTracker.getEventQueue();
      // The validator will sanitize this as [KEY] since it's a long string of alphanumeric chars
      expect(events[0].properties.query).toBe('[KEY]');
    });
  });

  describe('trackValidationDetails()', () => {
    it('should track validation error details', () => {
      const details = { field: 'url', value: 'invalid' };
      eventTracker.trackValidationDetails('nodes-base.httpRequest', 'required_field_missing', details);

      const events = eventTracker.getEventQueue();
      expect(events).toHaveLength(1);
      expect(events[0]).toMatchObject({
        event: 'validation_details',
        properties: {
          nodeType: 'nodes-base.httpRequest',
          errorType: 'required_field_missing',
          errorCategory: 'required_field_error',
          details
        }
      });
    });

    it('should categorize different error types', () => {
      const testCases = [
        { errorType: 'type_mismatch', expectedCategory: 'type_error' },
        { errorType: 'validation_failed', expectedCategory: 'validation_error' },
        { errorType: 'connection_lost', expectedCategory: 'connection_error' },
        { errorType: 'expression_syntax_error', expectedCategory: 'expression_error' },
        { errorType: 'unknown_error', expectedCategory: 'other_error' }
      ];

      testCases.forEach(({ errorType, expectedCategory }, index) => {
        eventTracker.trackValidationDetails(`node${index}`, errorType, {});
      });

      const events = eventTracker.getEventQueue();
      testCases.forEach((testCase, index) => {
        expect(events[index].properties.errorCategory).toBe(testCase.expectedCategory);
      });
    });

    it('should sanitize node type names', () => {
      eventTracker.trackValidationDetails('invalid$node@type!', 'test_error', {});

      const events = eventTracker.getEventQueue();
      expect(events[0].properties.nodeType).toBe('invalid_node_type_');
    });
  });

  describe('trackToolSequence()', () => {
    it('should track tool usage sequences', () => {
      eventTracker.trackToolSequence('httpRequest', 'webhook', 5000);

      const events = eventTracker.getEventQueue();
      expect(events).toHaveLength(1);
      expect(events[0]).toMatchObject({
        event: 'tool_sequence',
        properties: {
          previousTool: 'httpRequest',
          currentTool: 'webhook',
          timeDelta: 5000,
          isSlowTransition: false,
          sequence: 'httpRequest->webhook'
        }
      });
    });

    it('should identify slow transitions', () => {
      eventTracker.trackToolSequence('search', 'validate', 15000);

      const events = eventTracker.getEventQueue();
      expect(events[0].properties.isSlowTransition).toBe(true);
    });

    it('should cap time delta', () => {
      eventTracker.trackToolSequence('tool1', 'tool2', 500000);

      const events = eventTracker.getEventQueue();
      expect(events[0].properties.timeDelta).toBe(300000); // Capped at 5 minutes
    });
  });

  describe('trackNodeConfiguration()', () => {
    it('should track node configuration patterns', () => {
      eventTracker.trackNodeConfiguration('nodes-base.httpRequest', 5, false);

      const events = eventTracker.getEventQueue();
      expect(events).toHaveLength(1);
      expect(events[0].event).toBe('node_configuration');
      expect(events[0].properties.nodeType).toBe('nodes-base.httpRequest');
      expect(events[0].properties.propertiesSet).toBe(5);
      expect(events[0].properties.usedDefaults).toBe(false);
      expect(events[0].properties.complexity).toBe('moderate'); // 5 properties is moderate (4-10)
    });

    it('should categorize configuration complexity', () => {
      const testCases = [
        { properties: 0, expectedComplexity: 'defaults_only' },
        { properties: 2, expectedComplexity: 'simple' },
        { properties: 7, expectedComplexity: 'moderate' },
        { properties: 15, expectedComplexity: 'complex' }
      ];

      testCases.forEach(({ properties, expectedComplexity }, index) => {
        eventTracker.trackNodeConfiguration(`node${index}`, properties, false);
      });

      const events = eventTracker.getEventQueue();
      testCases.forEach((testCase, index) => {
        expect(events[index].properties.complexity).toBe(testCase.expectedComplexity);
      });
    });
  });

  describe('trackPerformanceMetric()', () => {
    it('should track performance metrics', () => {
      const metadata = { operation: 'database_query', table: 'nodes' };
      eventTracker.trackPerformanceMetric('search_nodes', 1500, metadata);

      const events = eventTracker.getEventQueue();
      expect(events).toHaveLength(1);
      expect(events[0]).toMatchObject({
        event: 'performance_metric',
        properties: {
          operation: 'search_nodes',
          duration: 1500,
          isSlow: true,
          isVerySlow: false,
          metadata
        }
      });
    });

    it('should identify very slow operations', () => {
      eventTracker.trackPerformanceMetric('slow_operation', 6000);

      const events = eventTracker.getEventQueue();
      expect(events[0].properties.isSlow).toBe(true);
      expect(events[0].properties.isVerySlow).toBe(true);
    });

    it('should record internal performance metrics', () => {
      eventTracker.trackPerformanceMetric('test_op', 500);
      eventTracker.trackPerformanceMetric('test_op', 1000);

      const stats = eventTracker.getStats();
      expect(stats.performanceMetrics.test_op).toBeDefined();
      expect(stats.performanceMetrics.test_op.count).toBe(2);
    });
  });

  describe('updateToolSequence()', () => {
    it('should track first tool without previous', () => {
      eventTracker.updateToolSequence('firstTool');

      expect(eventTracker.getEventQueue()).toHaveLength(0);
    });

    it('should track sequence after first tool', () => {
      eventTracker.updateToolSequence('firstTool');

      // Advance time slightly
      vi.useFakeTimers();
      vi.advanceTimersByTime(2000);

      eventTracker.updateToolSequence('secondTool');

      const events = eventTracker.getEventQueue();
      expect(events).toHaveLength(1);
      expect(events[0].event).toBe('tool_sequence');
      expect(events[0].properties.previousTool).toBe('firstTool');
      expect(events[0].properties.currentTool).toBe('secondTool');
    });
  });

  describe('queue management', () => {
    it('should provide access to event queue', () => {
      eventTracker.trackEvent('test1', {});
      eventTracker.trackEvent('test2', {});

      const queue = eventTracker.getEventQueue();
      expect(queue).toHaveLength(2);
      expect(queue[0].event).toBe('test1');
      expect(queue[1].event).toBe('test2');
    });

    it('should provide access to workflow queue', async () => {
      const workflow = { nodes: [], connections: {} };
      vi.mocked(WorkflowSanitizer.sanitizeWorkflow).mockReturnValue({
        workflowHash: 'hash1',
        nodeCount: 0,
        nodeTypes: [],
        hasTrigger: false,
        hasWebhook: false,
        complexity: 'simple',
        nodes: [],
        connections: {}
      });

      await eventTracker.trackWorkflowCreation(workflow, true);

      const queue = eventTracker.getWorkflowQueue();
      expect(queue).toHaveLength(1);
      expect(queue[0].workflow_hash).toBe('hash1');
    });

    it('should clear event queue', () => {
      eventTracker.trackEvent('test', {});
      expect(eventTracker.getEventQueue()).toHaveLength(1);

      eventTracker.clearEventQueue();
      expect(eventTracker.getEventQueue()).toHaveLength(0);
    });

    it('should clear workflow queue', async () => {
      const workflow = { nodes: [], connections: {} };
      vi.mocked(WorkflowSanitizer.sanitizeWorkflow).mockReturnValue({
        workflowHash: 'hash1',
        nodeCount: 0,
        nodeTypes: [],
        hasTrigger: false,
        hasWebhook: false,
        complexity: 'simple',
        nodes: [],
        connections: {}
      });

      await eventTracker.trackWorkflowCreation(workflow, true);
      expect(eventTracker.getWorkflowQueue()).toHaveLength(1);

      eventTracker.clearWorkflowQueue();
      expect(eventTracker.getWorkflowQueue()).toHaveLength(0);
    });
  });

  describe('getStats()', () => {
    it('should return comprehensive statistics', () => {
      eventTracker.trackEvent('test', {});
      eventTracker.trackPerformanceMetric('op1', 500);

      const stats = eventTracker.getStats();
      expect(stats).toHaveProperty('rateLimiter');
      expect(stats).toHaveProperty('validator');
      expect(stats).toHaveProperty('eventQueueSize');
      expect(stats).toHaveProperty('workflowQueueSize');
      expect(stats).toHaveProperty('performanceMetrics');
      expect(stats.eventQueueSize).toBe(2); // test event + performance metric event
    });

    it('should include performance metrics statistics', () => {
      eventTracker.trackPerformanceMetric('test_operation', 100);
      eventTracker.trackPerformanceMetric('test_operation', 200);
      eventTracker.trackPerformanceMetric('test_operation', 300);

      const stats = eventTracker.getStats();
      const perfStats = stats.performanceMetrics.test_operation;

      expect(perfStats).toBeDefined();
      expect(perfStats.count).toBe(3);
      expect(perfStats.min).toBe(100);
      expect(perfStats.max).toBe(300);
      expect(perfStats.avg).toBe(200);
    });
  });

  describe('performance metrics collection', () => {
    it('should maintain limited history per operation', () => {
      // Add more than the limit (100) to test truncation
      for (let i = 0; i < 105; i++) {
        eventTracker.trackPerformanceMetric('bulk_operation', i);
      }

      const stats = eventTracker.getStats();
      const perfStats = stats.performanceMetrics.bulk_operation;

      expect(perfStats.count).toBe(100); // Should be capped at 100
      expect(perfStats.min).toBe(5); // First 5 should be truncated
      expect(perfStats.max).toBe(104);
    });

    it('should calculate percentiles correctly', () => {
      // Add known values for percentile calculation
      const values = [10, 20, 30, 40, 50, 60, 70, 80, 90, 100];
      values.forEach(val => {
        eventTracker.trackPerformanceMetric('percentile_test', val);
      });

      const stats = eventTracker.getStats();
      const perfStats = stats.performanceMetrics.percentile_test;

      // With 10 values, the 50th percentile (median) is between 50 and 60
      expect(perfStats.p50).toBeGreaterThanOrEqual(50);
      expect(perfStats.p50).toBeLessThanOrEqual(60);
      expect(perfStats.p95).toBeGreaterThanOrEqual(90);
      expect(perfStats.p99).toBeGreaterThanOrEqual(90);
    });
  });

  describe('sanitization helpers', () => {
    it('should sanitize context strings properly', () => {
      const context = 'Error at https://api.example.com/v1/users/test@email.com?key=secret123456789012345678901234567890';
      eventTracker.trackError('TestError', context);

      const events = eventTracker.getEventQueue();
      // After sanitization: emails first, then keys, then URL (keeping path)
      expect(events[0].properties.context).toBe('Error at [URL]/v1/users/[EMAIL]?key=[KEY]');
    });

    it('should handle context truncation', () => {
      // Use a more realistic long context that won't trigger key sanitization
      const longContext = 'Error occurred while processing the request: ' + 'details '.repeat(20);
      eventTracker.trackError('TestError', longContext);

      const events = eventTracker.getEventQueue();
      // Should be truncated to 100 chars
      expect(events[0].properties.context).toHaveLength(100);
    });
  });
});