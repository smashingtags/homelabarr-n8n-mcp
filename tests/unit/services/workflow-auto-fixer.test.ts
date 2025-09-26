import { describe, it, expect, vi, beforeEach } from 'vitest';
import { WorkflowAutoFixer, isNodeFormatIssue } from '@/services/workflow-auto-fixer';
import { NodeRepository } from '@/database/node-repository';
import type { WorkflowValidationResult } from '@/services/workflow-validator';
import type { ExpressionFormatIssue } from '@/services/expression-format-validator';
import type { Workflow, WorkflowNode } from '@/types/n8n-api';

vi.mock('@/database/node-repository');
vi.mock('@/services/node-similarity-service');

describe('WorkflowAutoFixer', () => {
  let autoFixer: WorkflowAutoFixer;
  let mockRepository: NodeRepository;

  const createMockWorkflow = (nodes: WorkflowNode[]): Workflow => ({
    id: 'test-workflow',
    name: 'Test Workflow',
    active: false,
    nodes,
    connections: {},
    settings: {},
    createdAt: '',
    updatedAt: ''
  });

  const createMockNode = (id: string, type: string, parameters: any = {}): WorkflowNode => ({
    id,
    name: id,
    type,
    typeVersion: 1,
    position: [0, 0],
    parameters
  });

  beforeEach(() => {
    vi.clearAllMocks();
    mockRepository = new NodeRepository({} as any);
    autoFixer = new WorkflowAutoFixer(mockRepository);
  });

  describe('Type Guards', () => {
    it('should identify NodeFormatIssue correctly', () => {
      const validIssue: ExpressionFormatIssue = {
        fieldPath: 'url',
        currentValue: '{{ $json.url }}',
        correctedValue: '={{ $json.url }}',
        issueType: 'missing-prefix',
        severity: 'error',
        explanation: 'Missing = prefix'
      } as any;
      (validIssue as any).nodeName = 'httpRequest';
      (validIssue as any).nodeId = 'node-1';

      const invalidIssue: ExpressionFormatIssue = {
        fieldPath: 'url',
        currentValue: '{{ $json.url }}',
        correctedValue: '={{ $json.url }}',
        issueType: 'missing-prefix',
        severity: 'error',
        explanation: 'Missing = prefix'
      };

      expect(isNodeFormatIssue(validIssue)).toBe(true);
      expect(isNodeFormatIssue(invalidIssue)).toBe(false);
    });
  });

  describe('Expression Format Fixes', () => {
    it('should fix missing prefix in expressions', () => {
      const workflow = createMockWorkflow([
        createMockNode('node-1', 'nodes-base.httpRequest', {
          url: '{{ $json.url }}',
          method: 'GET'
        })
      ]);

      const formatIssues: ExpressionFormatIssue[] = [{
        fieldPath: 'url',
        currentValue: '{{ $json.url }}',
        correctedValue: '={{ $json.url }}',
        issueType: 'missing-prefix',
        severity: 'error',
        explanation: 'Expression must start with =',
        nodeName: 'node-1',
        nodeId: 'node-1'
      } as any];

      const validationResult: WorkflowValidationResult = {
        valid: false,
        errors: [],
        warnings: [],
        statistics: {
          totalNodes: 1,
          enabledNodes: 1,
          triggerNodes: 0,
          validConnections: 0,
          invalidConnections: 0,
          expressionsValidated: 0
        },
        suggestions: []
      };

      const result = autoFixer.generateFixes(workflow, validationResult, formatIssues);

      expect(result.fixes).toHaveLength(1);
      expect(result.fixes[0].type).toBe('expression-format');
      expect(result.fixes[0].before).toBe('{{ $json.url }}');
      expect(result.fixes[0].after).toBe('={{ $json.url }}');
      expect(result.fixes[0].confidence).toBe('high');

      expect(result.operations).toHaveLength(1);
      expect(result.operations[0].type).toBe('updateNode');
    });

    it('should handle multiple expression fixes in same node', () => {
      const workflow = createMockWorkflow([
        createMockNode('node-1', 'nodes-base.httpRequest', {
          url: '{{ $json.url }}',
          body: '{{ $json.body }}'
        })
      ]);

      const formatIssues: ExpressionFormatIssue[] = [
        {
          fieldPath: 'url',
          currentValue: '{{ $json.url }}',
          correctedValue: '={{ $json.url }}',
          issueType: 'missing-prefix',
          severity: 'error',
          explanation: 'Expression must start with =',
          nodeName: 'node-1',
          nodeId: 'node-1'
        } as any,
        {
          fieldPath: 'body',
          currentValue: '{{ $json.body }}',
          correctedValue: '={{ $json.body }}',
          issueType: 'missing-prefix',
          severity: 'error',
          explanation: 'Expression must start with =',
          nodeName: 'node-1',
          nodeId: 'node-1'
        } as any
      ];

      const validationResult: WorkflowValidationResult = {
        valid: false,
        errors: [],
        warnings: [],
        statistics: {
          totalNodes: 1,
          enabledNodes: 1,
          triggerNodes: 0,
          validConnections: 0,
          invalidConnections: 0,
          expressionsValidated: 0
        },
        suggestions: []
      };

      const result = autoFixer.generateFixes(workflow, validationResult, formatIssues);

      expect(result.fixes).toHaveLength(2);
      expect(result.operations).toHaveLength(1); // Single update operation for the node
    });
  });

  describe('TypeVersion Fixes', () => {
    it('should fix typeVersion exceeding maximum', () => {
      const workflow = createMockWorkflow([
        createMockNode('node-1', 'nodes-base.httpRequest', {})
      ]);

      const validationResult: WorkflowValidationResult = {
        valid: false,
        errors: [{
          type: 'error',
          nodeId: 'node-1',
          nodeName: 'node-1',
          message: 'typeVersion 3.5 exceeds maximum supported version 2.0'
        }],
        warnings: [],
        statistics: {
          totalNodes: 1,
          enabledNodes: 1,
          triggerNodes: 0,
          validConnections: 0,
          invalidConnections: 0,
          expressionsValidated: 0
        },
        suggestions: []
      };

      const result = autoFixer.generateFixes(workflow, validationResult, []);

      expect(result.fixes).toHaveLength(1);
      expect(result.fixes[0].type).toBe('typeversion-correction');
      expect(result.fixes[0].before).toBe(3.5);
      expect(result.fixes[0].after).toBe(2);
      expect(result.fixes[0].confidence).toBe('medium');
    });
  });

  describe('Error Output Configuration Fixes', () => {
    it('should remove conflicting onError setting', () => {
      const workflow = createMockWorkflow([
        createMockNode('node-1', 'nodes-base.httpRequest', {})
      ]);
      workflow.nodes[0].onError = 'continueErrorOutput';

      const validationResult: WorkflowValidationResult = {
        valid: false,
        errors: [{
          type: 'error',
          nodeId: 'node-1',
          nodeName: 'node-1',
          message: "Node has onError: 'continueErrorOutput' but no error output connections"
        }],
        warnings: [],
        statistics: {
          totalNodes: 1,
          enabledNodes: 1,
          triggerNodes: 0,
          validConnections: 0,
          invalidConnections: 0,
          expressionsValidated: 0
        },
        suggestions: []
      };

      const result = autoFixer.generateFixes(workflow, validationResult, []);

      expect(result.fixes).toHaveLength(1);
      expect(result.fixes[0].type).toBe('error-output-config');
      expect(result.fixes[0].before).toBe('continueErrorOutput');
      expect(result.fixes[0].after).toBeUndefined();
      expect(result.fixes[0].confidence).toBe('medium');
    });
  });

  describe('setNestedValue Validation', () => {
    it('should throw error for non-object target', () => {
      expect(() => {
        autoFixer['setNestedValue'](null, ['field'], 'value');
      }).toThrow('Cannot set value on non-object');

      expect(() => {
        autoFixer['setNestedValue']('string', ['field'], 'value');
      }).toThrow('Cannot set value on non-object');
    });

    it('should throw error for empty path', () => {
      expect(() => {
        autoFixer['setNestedValue']({}, [], 'value');
      }).toThrow('Cannot set value with empty path');
    });

    it('should handle nested paths correctly', () => {
      const obj = { level1: { level2: { level3: 'old' } } };
      autoFixer['setNestedValue'](obj, ['level1', 'level2', 'level3'], 'new');
      expect(obj.level1.level2.level3).toBe('new');
    });

    it('should create missing nested objects', () => {
      const obj = {};
      autoFixer['setNestedValue'](obj, ['level1', 'level2', 'level3'], 'value');
      expect(obj).toEqual({
        level1: {
          level2: {
            level3: 'value'
          }
        }
      });
    });

    it('should handle array indices in paths', () => {
      const obj: any = { items: [] };
      autoFixer['setNestedValue'](obj, ['items[0]', 'name'], 'test');
      expect(obj.items[0].name).toBe('test');
    });

    it('should throw error for invalid array notation', () => {
      const obj = {};
      expect(() => {
        autoFixer['setNestedValue'](obj, ['field[abc]'], 'value');
      }).toThrow('Invalid array notation: field[abc]');
    });

    it('should throw when trying to traverse non-object', () => {
      const obj = { field: 'string' };
      expect(() => {
        autoFixer['setNestedValue'](obj, ['field', 'nested'], 'value');
      }).toThrow('Cannot traverse through string at field');
    });
  });

  describe('Confidence Filtering', () => {
    it('should filter fixes by confidence level', () => {
      const workflow = createMockWorkflow([
        createMockNode('node-1', 'nodes-base.httpRequest', { url: '{{ $json.url }}' })
      ]);

      const formatIssues: ExpressionFormatIssue[] = [{
        fieldPath: 'url',
        currentValue: '{{ $json.url }}',
        correctedValue: '={{ $json.url }}',
        issueType: 'missing-prefix',
        severity: 'error',
        explanation: 'Expression must start with =',
        nodeName: 'node-1',
        nodeId: 'node-1'
      } as any];

      const validationResult: WorkflowValidationResult = {
        valid: false,
        errors: [],
        warnings: [],
        statistics: {
          totalNodes: 1,
          enabledNodes: 1,
          triggerNodes: 0,
          validConnections: 0,
          invalidConnections: 0,
          expressionsValidated: 0
        },
        suggestions: []
      };

      const result = autoFixer.generateFixes(workflow, validationResult, formatIssues, {
        confidenceThreshold: 'low'
      });

      expect(result.fixes.length).toBeGreaterThan(0);
      expect(result.fixes.every(f => ['high', 'medium', 'low'].includes(f.confidence))).toBe(true);
    });
  });

  describe('Summary Generation', () => {
    it('should generate appropriate summary for fixes', () => {
      const workflow = createMockWorkflow([
        createMockNode('node-1', 'nodes-base.httpRequest', { url: '{{ $json.url }}' })
      ]);

      const formatIssues: ExpressionFormatIssue[] = [{
        fieldPath: 'url',
        currentValue: '{{ $json.url }}',
        correctedValue: '={{ $json.url }}',
        issueType: 'missing-prefix',
        severity: 'error',
        explanation: 'Expression must start with =',
        nodeName: 'node-1',
        nodeId: 'node-1'
      } as any];

      const validationResult: WorkflowValidationResult = {
        valid: false,
        errors: [],
        warnings: [],
        statistics: {
          totalNodes: 1,
          enabledNodes: 1,
          triggerNodes: 0,
          validConnections: 0,
          invalidConnections: 0,
          expressionsValidated: 0
        },
        suggestions: []
      };

      const result = autoFixer.generateFixes(workflow, validationResult, formatIssues);

      expect(result.summary).toContain('expression format');
      expect(result.stats.total).toBe(1);
      expect(result.stats.byType['expression-format']).toBe(1);
    });

    it('should handle empty fixes gracefully', () => {
      const workflow = createMockWorkflow([]);
      const validationResult: WorkflowValidationResult = {
        valid: true,
        errors: [],
        warnings: [],
        statistics: {
          totalNodes: 0,
          enabledNodes: 0,
          triggerNodes: 0,
          validConnections: 0,
          invalidConnections: 0,
          expressionsValidated: 0
        },
        suggestions: []
      };

      const result = autoFixer.generateFixes(workflow, validationResult, []);

      expect(result.summary).toBe('No fixes available');
      expect(result.stats.total).toBe(0);
      expect(result.operations).toEqual([]);
    });
  });
});