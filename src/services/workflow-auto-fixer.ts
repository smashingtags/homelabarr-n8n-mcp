/**
 * Workflow Auto-Fixer Service
 *
 * Automatically generates fix operations for common workflow validation errors.
 * Converts validation results into diff operations that can be applied to fix the workflow.
 */

import crypto from 'crypto';
import { WorkflowValidationResult } from './workflow-validator';
import { ExpressionFormatIssue } from './expression-format-validator';
import { NodeSimilarityService } from './node-similarity-service';
import { NodeRepository } from '../database/node-repository';
import {
  WorkflowDiffOperation,
  UpdateNodeOperation
} from '../types/workflow-diff';
import { WorkflowNode, Workflow } from '../types/n8n-api';
import { Logger } from '../utils/logger';

const logger = new Logger({ prefix: '[WorkflowAutoFixer]' });

export type FixConfidenceLevel = 'high' | 'medium' | 'low';
export type FixType =
  | 'expression-format'
  | 'typeversion-correction'
  | 'error-output-config'
  | 'node-type-correction'
  | 'webhook-missing-path';

export interface AutoFixConfig {
  applyFixes: boolean;
  fixTypes?: FixType[];
  confidenceThreshold?: FixConfidenceLevel;
  maxFixes?: number;
}

export interface FixOperation {
  node: string;
  field: string;
  type: FixType;
  before: any;
  after: any;
  confidence: FixConfidenceLevel;
  description: string;
}

export interface AutoFixResult {
  operations: WorkflowDiffOperation[];
  fixes: FixOperation[];
  summary: string;
  stats: {
    total: number;
    byType: Record<FixType, number>;
    byConfidence: Record<FixConfidenceLevel, number>;
  };
}

export interface NodeFormatIssue extends ExpressionFormatIssue {
  nodeName: string;
  nodeId: string;
}

/**
 * Type guard to check if an issue has node information
 */
export function isNodeFormatIssue(issue: ExpressionFormatIssue): issue is NodeFormatIssue {
  return 'nodeName' in issue && 'nodeId' in issue &&
         typeof (issue as any).nodeName === 'string' &&
         typeof (issue as any).nodeId === 'string';
}

/**
 * Error with suggestions for node type issues
 */
export interface NodeTypeError {
  type: 'error';
  nodeId?: string;
  nodeName?: string;
  message: string;
  suggestions?: Array<{
    nodeType: string;
    confidence: number;
    reason: string;
  }>;
}

export class WorkflowAutoFixer {
  private readonly defaultConfig: AutoFixConfig = {
    applyFixes: false,
    confidenceThreshold: 'medium',
    maxFixes: 50
  };
  private similarityService: NodeSimilarityService | null = null;

  constructor(repository?: NodeRepository) {
    if (repository) {
      this.similarityService = new NodeSimilarityService(repository);
    }
  }

  /**
   * Generate fix operations from validation results
   */
  generateFixes(
    workflow: Workflow,
    validationResult: WorkflowValidationResult,
    formatIssues: ExpressionFormatIssue[] = [],
    config: Partial<AutoFixConfig> = {}
  ): AutoFixResult {
    const fullConfig = { ...this.defaultConfig, ...config };
    const operations: WorkflowDiffOperation[] = [];
    const fixes: FixOperation[] = [];

    // Create a map for quick node lookup
    const nodeMap = new Map<string, WorkflowNode>();
    workflow.nodes.forEach(node => {
      nodeMap.set(node.name, node);
      nodeMap.set(node.id, node);
    });

    // Process expression format issues (HIGH confidence)
    if (!fullConfig.fixTypes || fullConfig.fixTypes.includes('expression-format')) {
      this.processExpressionFormatFixes(formatIssues, nodeMap, operations, fixes);
    }

    // Process typeVersion errors (MEDIUM confidence)
    if (!fullConfig.fixTypes || fullConfig.fixTypes.includes('typeversion-correction')) {
      this.processTypeVersionFixes(validationResult, nodeMap, operations, fixes);
    }

    // Process error output configuration issues (MEDIUM confidence)
    if (!fullConfig.fixTypes || fullConfig.fixTypes.includes('error-output-config')) {
      this.processErrorOutputFixes(validationResult, nodeMap, workflow, operations, fixes);
    }

    // Process node type corrections (HIGH confidence only)
    if (!fullConfig.fixTypes || fullConfig.fixTypes.includes('node-type-correction')) {
      this.processNodeTypeFixes(validationResult, nodeMap, operations, fixes);
    }

    // Process webhook path fixes (HIGH confidence)
    if (!fullConfig.fixTypes || fullConfig.fixTypes.includes('webhook-missing-path')) {
      this.processWebhookPathFixes(validationResult, nodeMap, operations, fixes);
    }

    // Filter by confidence threshold
    const filteredFixes = this.filterByConfidence(fixes, fullConfig.confidenceThreshold);
    const filteredOperations = this.filterOperationsByFixes(operations, filteredFixes, fixes);

    // Apply max fixes limit
    const limitedFixes = filteredFixes.slice(0, fullConfig.maxFixes);
    const limitedOperations = this.filterOperationsByFixes(filteredOperations, limitedFixes, filteredFixes);

    // Generate summary
    const stats = this.calculateStats(limitedFixes);
    const summary = this.generateSummary(stats);

    return {
      operations: limitedOperations,
      fixes: limitedFixes,
      summary,
      stats
    };
  }

  /**
   * Process expression format fixes (missing = prefix)
   */
  private processExpressionFormatFixes(
    formatIssues: ExpressionFormatIssue[],
    nodeMap: Map<string, WorkflowNode>,
    operations: WorkflowDiffOperation[],
    fixes: FixOperation[]
  ): void {
    // Group fixes by node to create single update operation per node
    const fixesByNode = new Map<string, ExpressionFormatIssue[]>();

    for (const issue of formatIssues) {
      // Process both errors and warnings for missing-prefix issues
      if (issue.issueType === 'missing-prefix') {
        // Use type guard to ensure we have node information
        if (!isNodeFormatIssue(issue)) {
          logger.warn('Expression format issue missing node information', {
            fieldPath: issue.fieldPath,
            issueType: issue.issueType
          });
          continue;
        }

        const nodeName = issue.nodeName;

        if (!fixesByNode.has(nodeName)) {
          fixesByNode.set(nodeName, []);
        }
        fixesByNode.get(nodeName)!.push(issue);
      }
    }

    // Create update operations for each node
    for (const [nodeName, nodeIssues] of fixesByNode) {
      const node = nodeMap.get(nodeName);
      if (!node) continue;

      const updatedParameters = JSON.parse(JSON.stringify(node.parameters || {}));

      for (const issue of nodeIssues) {
        // Apply the fix to parameters
        // The fieldPath doesn't include node name, use as is
        const fieldPath = issue.fieldPath.split('.');
        this.setNestedValue(updatedParameters, fieldPath, issue.correctedValue);

        fixes.push({
          node: nodeName,
          field: issue.fieldPath,
          type: 'expression-format',
          before: issue.currentValue,
          after: issue.correctedValue,
          confidence: 'high',
          description: issue.explanation
        });
      }

      // Create update operation
      const operation: UpdateNodeOperation = {
        type: 'updateNode',
        nodeId: nodeName, // Can be name or ID
        updates: {
          parameters: updatedParameters
        }
      };
      operations.push(operation);
    }
  }

  /**
   * Process typeVersion fixes
   */
  private processTypeVersionFixes(
    validationResult: WorkflowValidationResult,
    nodeMap: Map<string, WorkflowNode>,
    operations: WorkflowDiffOperation[],
    fixes: FixOperation[]
  ): void {
    for (const error of validationResult.errors) {
      if (error.message.includes('typeVersion') && error.message.includes('exceeds maximum')) {
        // Extract version info from error message
        const versionMatch = error.message.match(/typeVersion (\d+(?:\.\d+)?) exceeds maximum supported version (\d+(?:\.\d+)?)/);
        if (versionMatch) {
          const currentVersion = parseFloat(versionMatch[1]);
          const maxVersion = parseFloat(versionMatch[2]);
          const nodeName = error.nodeName || error.nodeId;

          if (!nodeName) continue;

          const node = nodeMap.get(nodeName);
          if (!node) continue;

          fixes.push({
            node: nodeName,
            field: 'typeVersion',
            type: 'typeversion-correction',
            before: currentVersion,
            after: maxVersion,
            confidence: 'medium',
            description: `Corrected typeVersion from ${currentVersion} to maximum supported ${maxVersion}`
          });

          const operation: UpdateNodeOperation = {
            type: 'updateNode',
            nodeId: nodeName,
            updates: {
              typeVersion: maxVersion
            }
          };
          operations.push(operation);
        }
      }
    }
  }

  /**
   * Process error output configuration fixes
   */
  private processErrorOutputFixes(
    validationResult: WorkflowValidationResult,
    nodeMap: Map<string, WorkflowNode>,
    workflow: Workflow,
    operations: WorkflowDiffOperation[],
    fixes: FixOperation[]
  ): void {
    for (const error of validationResult.errors) {
      if (error.message.includes('onError: \'continueErrorOutput\'') &&
          error.message.includes('no error output connections')) {
        const nodeName = error.nodeName || error.nodeId;
        if (!nodeName) continue;

        const node = nodeMap.get(nodeName);
        if (!node) continue;

        // Remove the conflicting onError setting
        fixes.push({
          node: nodeName,
          field: 'onError',
          type: 'error-output-config',
          before: 'continueErrorOutput',
          after: undefined,
          confidence: 'medium',
          description: 'Removed onError setting due to missing error output connections'
        });

        const operation: UpdateNodeOperation = {
          type: 'updateNode',
          nodeId: nodeName,
          updates: {
            onError: undefined // This will remove the property
          }
        };
        operations.push(operation);
      }
    }
  }

  /**
   * Process node type corrections for unknown nodes
   */
  private processNodeTypeFixes(
    validationResult: WorkflowValidationResult,
    nodeMap: Map<string, WorkflowNode>,
    operations: WorkflowDiffOperation[],
    fixes: FixOperation[]
  ): void {
    // Only process if we have the similarity service
    if (!this.similarityService) {
      return;
    }

    for (const error of validationResult.errors) {
      // Type-safe check for unknown node type errors with suggestions
      const nodeError = error as NodeTypeError;

      if (error.message?.includes('Unknown node type:') && nodeError.suggestions) {
        // Only auto-fix if we have a high-confidence suggestion (>= 0.9)
        const highConfidenceSuggestion = nodeError.suggestions.find(s => s.confidence >= 0.9);

        if (highConfidenceSuggestion && nodeError.nodeId) {
          const node = nodeMap.get(nodeError.nodeId) || nodeMap.get(nodeError.nodeName || '');

          if (node) {
            fixes.push({
              node: node.name,
              field: 'type',
              type: 'node-type-correction',
              before: node.type,
              after: highConfidenceSuggestion.nodeType,
              confidence: 'high',
              description: `Fix node type: "${node.type}" → "${highConfidenceSuggestion.nodeType}" (${highConfidenceSuggestion.reason})`
            });

            const operation: UpdateNodeOperation = {
              type: 'updateNode',
              nodeId: node.name,
              updates: {
                type: highConfidenceSuggestion.nodeType
              }
            };
            operations.push(operation);
          }
        }
      }
    }
  }

  /**
   * Process webhook path fixes for webhook nodes missing path parameter
   */
  private processWebhookPathFixes(
    validationResult: WorkflowValidationResult,
    nodeMap: Map<string, WorkflowNode>,
    operations: WorkflowDiffOperation[],
    fixes: FixOperation[]
  ): void {
    for (const error of validationResult.errors) {
      // Check for webhook path required error
      if (error.message === 'Webhook path is required') {
        const nodeName = error.nodeName || error.nodeId;
        if (!nodeName) continue;

        const node = nodeMap.get(nodeName);
        if (!node) continue;

        // Only fix webhook nodes
        if (!node.type?.includes('webhook')) continue;

        // Generate a unique UUID for both path and webhookId
        const webhookId = crypto.randomUUID();

        // Check if we need to update typeVersion
        const currentTypeVersion = node.typeVersion || 1;
        const needsVersionUpdate = currentTypeVersion < 2.1;

        fixes.push({
          node: nodeName,
          field: 'path',
          type: 'webhook-missing-path',
          before: undefined,
          after: webhookId,
          confidence: 'high',
          description: needsVersionUpdate
            ? `Generated webhook path and ID: ${webhookId} (also updating typeVersion to 2.1)`
            : `Generated webhook path and ID: ${webhookId}`
        });

        // Create update operation with both path and webhookId
        // The updates object uses dot notation for nested properties
        const updates: Record<string, any> = {
          'parameters.path': webhookId,
          'webhookId': webhookId
        };

        // Only update typeVersion if it's older than 2.1
        if (needsVersionUpdate) {
          updates['typeVersion'] = 2.1;
        }

        const operation: UpdateNodeOperation = {
          type: 'updateNode',
          nodeId: nodeName,
          updates
        };
        operations.push(operation);
      }
    }
  }

  /**
   * Set a nested value in an object using a path array
   * Includes validation to prevent silent failures
   */
  private setNestedValue(obj: any, path: string[], value: any): void {
    if (!obj || typeof obj !== 'object') {
      throw new Error('Cannot set value on non-object');
    }

    if (path.length === 0) {
      throw new Error('Cannot set value with empty path');
    }

    try {
      let current = obj;

      for (let i = 0; i < path.length - 1; i++) {
        const key = path[i];

        // Handle array indices
        if (key.includes('[')) {
          const matches = key.match(/^([^[]+)\[(\d+)\]$/);
          if (!matches) {
            throw new Error(`Invalid array notation: ${key}`);
          }

          const [, arrayKey, indexStr] = matches;
          const index = parseInt(indexStr, 10);

          if (isNaN(index) || index < 0) {
            throw new Error(`Invalid array index: ${indexStr}`);
          }

          if (!current[arrayKey]) {
            current[arrayKey] = [];
          }

          if (!Array.isArray(current[arrayKey])) {
            throw new Error(`Expected array at ${arrayKey}, got ${typeof current[arrayKey]}`);
          }

          while (current[arrayKey].length <= index) {
            current[arrayKey].push({});
          }

          current = current[arrayKey][index];
        } else {
          if (current[key] === null || current[key] === undefined) {
            current[key] = {};
          }

          if (typeof current[key] !== 'object' || Array.isArray(current[key])) {
            throw new Error(`Cannot traverse through ${typeof current[key]} at ${key}`);
          }

          current = current[key];
        }
      }

      // Set the final value
      const lastKey = path[path.length - 1];

      if (lastKey.includes('[')) {
        const matches = lastKey.match(/^([^[]+)\[(\d+)\]$/);
        if (!matches) {
          throw new Error(`Invalid array notation: ${lastKey}`);
        }

        const [, arrayKey, indexStr] = matches;
        const index = parseInt(indexStr, 10);

        if (isNaN(index) || index < 0) {
          throw new Error(`Invalid array index: ${indexStr}`);
        }

        if (!current[arrayKey]) {
          current[arrayKey] = [];
        }

        if (!Array.isArray(current[arrayKey])) {
          throw new Error(`Expected array at ${arrayKey}, got ${typeof current[arrayKey]}`);
        }

        while (current[arrayKey].length <= index) {
          current[arrayKey].push(null);
        }

        current[arrayKey][index] = value;
      } else {
        current[lastKey] = value;
      }
    } catch (error) {
      logger.error('Failed to set nested value', {
        path: path.join('.'),
        error: error instanceof Error ? error.message : String(error)
      });
      throw error;
    }
  }

  /**
   * Filter fixes by confidence level
   */
  private filterByConfidence(
    fixes: FixOperation[],
    threshold?: FixConfidenceLevel
  ): FixOperation[] {
    if (!threshold) return fixes;

    const levels: FixConfidenceLevel[] = ['high', 'medium', 'low'];
    const thresholdIndex = levels.indexOf(threshold);

    return fixes.filter(fix => {
      const fixIndex = levels.indexOf(fix.confidence);
      return fixIndex <= thresholdIndex;
    });
  }

  /**
   * Filter operations to match filtered fixes
   */
  private filterOperationsByFixes(
    operations: WorkflowDiffOperation[],
    filteredFixes: FixOperation[],
    allFixes: FixOperation[]
  ): WorkflowDiffOperation[] {
    const fixedNodes = new Set(filteredFixes.map(f => f.node));
    return operations.filter(op => {
      if (op.type === 'updateNode') {
        return fixedNodes.has(op.nodeId || '');
      }
      return true;
    });
  }

  /**
   * Calculate statistics about fixes
   */
  private calculateStats(fixes: FixOperation[]): AutoFixResult['stats'] {
    const stats: AutoFixResult['stats'] = {
      total: fixes.length,
      byType: {
        'expression-format': 0,
        'typeversion-correction': 0,
        'error-output-config': 0,
        'node-type-correction': 0,
        'webhook-missing-path': 0
      },
      byConfidence: {
        'high': 0,
        'medium': 0,
        'low': 0
      }
    };

    for (const fix of fixes) {
      stats.byType[fix.type]++;
      stats.byConfidence[fix.confidence]++;
    }

    return stats;
  }

  /**
   * Generate a human-readable summary
   */
  private generateSummary(stats: AutoFixResult['stats']): string {
    if (stats.total === 0) {
      return 'No fixes available';
    }

    const parts: string[] = [];

    if (stats.byType['expression-format'] > 0) {
      parts.push(`${stats.byType['expression-format']} expression format ${stats.byType['expression-format'] === 1 ? 'error' : 'errors'}`);
    }
    if (stats.byType['typeversion-correction'] > 0) {
      parts.push(`${stats.byType['typeversion-correction']} version ${stats.byType['typeversion-correction'] === 1 ? 'issue' : 'issues'}`);
    }
    if (stats.byType['error-output-config'] > 0) {
      parts.push(`${stats.byType['error-output-config']} error output ${stats.byType['error-output-config'] === 1 ? 'configuration' : 'configurations'}`);
    }
    if (stats.byType['node-type-correction'] > 0) {
      parts.push(`${stats.byType['node-type-correction']} node type ${stats.byType['node-type-correction'] === 1 ? 'correction' : 'corrections'}`);
    }
    if (stats.byType['webhook-missing-path'] > 0) {
      parts.push(`${stats.byType['webhook-missing-path']} webhook ${stats.byType['webhook-missing-path'] === 1 ? 'path' : 'paths'}`);
    }

    if (parts.length === 0) {
      return `Fixed ${stats.total} ${stats.total === 1 ? 'issue' : 'issues'}`;
    }

    return `Fixed ${parts.join(', ')}`;
  }
}