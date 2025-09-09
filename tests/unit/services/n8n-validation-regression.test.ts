import { describe, it, expect } from 'vitest';
import { cleanWorkflowForUpdate } from '../../../src/services/n8n-validation';
import { Workflow } from '../../../src/types/n8n-api';

describe('n8n-validation regression tests', () => {
  describe('cleanWorkflowForUpdate - Issues #168, #159, #136 fix', () => {
    it('should remove problematic top-level properties that cause "additional properties" errors', () => {
      // Simulate a workflow response from n8n API with problematic properties
      const workflowWithProblematicProps: any = {
        id: "test-workflow",
        name: "Test Workflow",
        active: true,
        nodes: [],
        connections: {},
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        versionId: "abc123",
        settings: {
          executionOrder: "v1" as const,
          saveDataErrorExecution: "all" as const,
          saveDataSuccessExecution: "all" as const,
          saveManualExecutions: true,
          saveExecutionProgress: true
        },
        tags: [{ id: "tag1", name: "test" }],
        pinData: {},
        staticData: {},
        meta: { instanceId: "test" },
        triggerCount: 5,
        shared: [],
        usedCredentials: [],
        sharedWithProjects: [],
        // Newer API response properties that cause issues
        homeProject: { id: "home", name: "Home" },
        scopes: ["workflow:read"],
        ownedBy: { id: "user", email: "test@test.com" },
        projects: [],
        executionCount: 10,
        hasCredentials: true,
      };

      const cleaned = cleanWorkflowForUpdate(workflowWithProblematicProps);

      // Verify problematic properties are removed
      expect((cleaned as any).homeProject).toBeUndefined();
      expect((cleaned as any).scopes).toBeUndefined();
      expect((cleaned as any).ownedBy).toBeUndefined();
      expect((cleaned as any).projects).toBeUndefined();
      expect((cleaned as any).executionCount).toBeUndefined();
      expect((cleaned as any).hasCredentials).toBeUndefined();
      
      // Verify other properties are also removed as expected
      expect(cleaned.id).toBeUndefined();
      expect(cleaned.active).toBeUndefined();
      expect(cleaned.tags).toBeUndefined();
      expect((cleaned as any).pinData).toBeUndefined();
      expect(cleaned.meta).toBeUndefined();
      
      // Verify core properties are preserved
      expect(cleaned.name).toBe("Test Workflow");
      expect(cleaned.nodes).toBeDefined();
      expect(cleaned.connections).toBeDefined();
      expect(cleaned.settings).toBeDefined();
    });

    it('should clean settings object to remove properties not in n8n API schema', () => {
      const workflowWithCustomSettings: Workflow = {
        id: "test",
        name: "Test",
        active: false,
        nodes: [],
        connections: {},
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        versionId: "abc",
        settings: {
          // Valid properties
          executionOrder: "v1" as const,
          timezone: "UTC",
          saveDataErrorExecution: "all" as const,
          saveDataSuccessExecution: "all" as const,
          saveManualExecutions: true,
          saveExecutionProgress: true,
          executionTimeout: 3600,
          errorWorkflow: "error-workflow-id",
          // Invalid properties that would cause API errors
          customExecutionMode: "queue",
          retrySettings: { enabled: true },
          debugMode: true,
          advancedOptions: { parallel: false }
        } as any
      };

      const cleaned = cleanWorkflowForUpdate(workflowWithCustomSettings);

      // Verify valid settings properties are preserved
      expect(cleaned.settings?.executionOrder).toBe("v1");
      expect(cleaned.settings?.timezone).toBe("UTC");
      expect(cleaned.settings?.saveDataErrorExecution).toBe("all");
      expect(cleaned.settings?.saveDataSuccessExecution).toBe("all");
      expect(cleaned.settings?.saveManualExecutions).toBe(true);
      expect(cleaned.settings?.saveExecutionProgress).toBe(true);
      expect(cleaned.settings?.executionTimeout).toBe(3600);
      expect(cleaned.settings?.errorWorkflow).toBe("error-workflow-id");

      // Verify invalid settings properties are removed
      expect((cleaned.settings as any)?.customExecutionMode).toBeUndefined();
      expect((cleaned.settings as any)?.retrySettings).toBeUndefined();
      expect((cleaned.settings as any)?.debugMode).toBeUndefined();
      expect((cleaned.settings as any)?.advancedOptions).toBeUndefined();
    });

    it('should handle workflow with no settings gracefully', () => {
      const workflowWithNoSettings: Workflow = {
        id: "test",
        name: "Test",
        active: false,
        nodes: [],
        connections: {},
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        versionId: "abc",
        settings: undefined as any
      };

      const cleaned = cleanWorkflowForUpdate(workflowWithNoSettings);

      expect(cleaned.settings).toBeUndefined();
    });

    it('should handle workflow with empty settings object', () => {
      const workflowWithEmptySettings: Workflow = {
        id: "test",
        name: "Test",
        active: false,
        nodes: [],
        connections: {},
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        versionId: "abc",
        settings: {}
      };

      const cleaned = cleanWorkflowForUpdate(workflowWithEmptySettings);

      // Empty settings object should be cleaned to undefined
      expect(cleaned.settings).toBeUndefined();
    });

    it('should only preserve valid settings when some are valid and some are invalid', () => {
      const mixedSettings: Workflow = {
        id: "test",
        name: "Test",
        active: false,
        nodes: [],
        connections: {},
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        versionId: "abc",
        settings: {
          executionOrder: "v1" as const, // valid
          invalidProperty: "should be removed", // invalid
          timezone: "America/New_York", // valid
          anotherInvalid: { nested: true } // invalid
        } as any
      };

      const cleaned = cleanWorkflowForUpdate(mixedSettings);

      expect(cleaned.settings?.executionOrder).toBe("v1");
      expect(cleaned.settings?.timezone).toBe("America/New_York");
      expect((cleaned.settings as any)?.invalidProperty).toBeUndefined();
      expect((cleaned.settings as any)?.anotherInvalid).toBeUndefined();
      
      // Should have exactly 2 properties
      expect(Object.keys(cleaned.settings || {})).toHaveLength(2);
    });

    it('should create minimal payload that n8n API will accept', () => {
      // This test simulates the exact scenario that was failing
      const fullN8nApiResponse: any = {
        id: "realistic-workflow-id",
        name: "Production Workflow",
        active: true,
        nodes: [
          {
            id: "node1",
            name: "Webhook",
            type: "n8n-nodes-base.webhook",
            typeVersion: 2,
            position: [100, 200],
            parameters: { path: "test" }
          }
        ],
        connections: {
          "Webhook": {
            "main": [[]]
          }
        },
        createdAt: "2024-01-01T00:00:00.000Z",
        updatedAt: "2024-01-01T00:00:00.000Z",
        versionId: "version123",
        settings: {
          executionOrder: "v1",
          saveDataErrorExecution: "all",
          saveDataSuccessExecution: "all",
          saveManualExecutions: true,
          saveExecutionProgress: true,
          // This would cause the error
          customProperty: "problematic value"
        },
        // All these would cause "additional properties" errors
        homeProject: { id: "home" },
        scopes: ["read", "write"],
        ownedBy: { id: "user" },
        tags: [],
        meta: {},
        pinData: {},
        staticData: {}
      };

      const cleaned = cleanWorkflowForUpdate(fullN8nApiResponse);

      // The result should only contain the 4 core properties n8n API accepts
      const allowedTopLevelKeys = ['name', 'nodes', 'connections', 'settings'];
      const actualKeys = Object.keys(cleaned);
      
      expect(actualKeys.every(key => allowedTopLevelKeys.includes(key))).toBe(true);
      expect(actualKeys).toHaveLength(4);

      // Settings should be cleaned too
      expect(cleaned.settings).toBeDefined();
      expect((cleaned.settings as any)?.customProperty).toBeUndefined();
      
      // Core data should be preserved
      expect(cleaned.name).toBe("Production Workflow");
      expect(cleaned.nodes).toHaveLength(1);
      expect(cleaned.connections).toBeDefined();
    });
  });
});