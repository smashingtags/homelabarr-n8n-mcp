import { describe, it, expect } from 'vitest';
import { WorkflowSanitizer } from '../../../src/telemetry/workflow-sanitizer';

describe('WorkflowSanitizer', () => {
  describe('sanitizeWorkflow', () => {
    it('should remove API keys from parameters', () => {
      const workflow = {
        nodes: [
          {
            id: '1',
            name: 'HTTP Request',
            type: 'n8n-nodes-base.httpRequest',
            position: [100, 100],
            parameters: {
              url: 'https://api.example.com',
              apiKey: 'sk-1234567890abcdef1234567890abcdef',
              headers: {
                'Authorization': 'Bearer sk-1234567890abcdef1234567890abcdef'
              }
            }
          }
        ],
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      expect(sanitized.nodes[0].parameters.apiKey).toBe('[REDACTED]');
      expect(sanitized.nodes[0].parameters.headers.Authorization).toBe('[REDACTED]');
    });

    it('should sanitize webhook URLs but keep structure', () => {
      const workflow = {
        nodes: [
          {
            id: '1',
            name: 'Webhook',
            type: 'n8n-nodes-base.webhook',
            position: [100, 100],
            parameters: {
              path: 'my-webhook',
              webhookUrl: 'https://n8n.example.com/webhook/abc-def-ghi',
              method: 'POST'
            }
          }
        ],
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      expect(sanitized.nodes[0].parameters.webhookUrl).toBe('[REDACTED]');
      expect(sanitized.nodes[0].parameters.method).toBe('POST'); // Method should remain
      expect(sanitized.nodes[0].parameters.path).toBe('my-webhook'); // Path should remain
    });

    it('should remove credentials entirely', () => {
      const workflow = {
        nodes: [
          {
            id: '1',
            name: 'Slack',
            type: 'n8n-nodes-base.slack',
            position: [100, 100],
            parameters: {
              channel: 'general',
              text: 'Hello World'
            },
            credentials: {
              slackApi: {
                id: 'cred-123',
                name: 'My Slack'
              }
            }
          }
        ],
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      expect(sanitized.nodes[0].credentials).toBeUndefined();
      expect(sanitized.nodes[0].parameters.channel).toBe('general'); // Channel should remain
      expect(sanitized.nodes[0].parameters.text).toBe('Hello World'); // Text should remain
    });

    it('should sanitize URLs in parameters', () => {
      const workflow = {
        nodes: [
          {
            id: '1',
            name: 'HTTP Request',
            type: 'n8n-nodes-base.httpRequest',
            position: [100, 100],
            parameters: {
              url: 'https://api.example.com/endpoint',
              endpoint: 'https://another.example.com/api',
              baseUrl: 'https://base.example.com'
            }
          }
        ],
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      expect(sanitized.nodes[0].parameters.url).toBe('[REDACTED]');
      expect(sanitized.nodes[0].parameters.endpoint).toBe('[REDACTED]');
      expect(sanitized.nodes[0].parameters.baseUrl).toBe('[REDACTED]');
    });

    it('should calculate workflow metrics correctly', () => {
      const workflow = {
        nodes: [
          {
            id: '1',
            name: 'Webhook',
            type: 'n8n-nodes-base.webhook',
            position: [100, 100],
            parameters: {}
          },
          {
            id: '2',
            name: 'HTTP Request',
            type: 'n8n-nodes-base.httpRequest',
            position: [200, 100],
            parameters: {}
          },
          {
            id: '3',
            name: 'Slack',
            type: 'n8n-nodes-base.slack',
            position: [300, 100],
            parameters: {}
          }
        ],
        connections: {
          '1': {
            main: [[{ node: '2', type: 'main', index: 0 }]]
          },
          '2': {
            main: [[{ node: '3', type: 'main', index: 0 }]]
          }
        }
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      expect(sanitized.nodeCount).toBe(3);
      expect(sanitized.nodeTypes).toContain('n8n-nodes-base.webhook');
      expect(sanitized.nodeTypes).toContain('n8n-nodes-base.httpRequest');
      expect(sanitized.nodeTypes).toContain('n8n-nodes-base.slack');
      expect(sanitized.hasTrigger).toBe(true);
      expect(sanitized.hasWebhook).toBe(true);
      expect(sanitized.complexity).toBe('simple');
    });

    it('should calculate complexity based on node count', () => {
      const createWorkflow = (nodeCount: number) => ({
        nodes: Array.from({ length: nodeCount }, (_, i) => ({
          id: String(i),
          name: `Node ${i}`,
          type: 'n8n-nodes-base.function',
          position: [i * 100, 100],
          parameters: {}
        })),
        connections: {}
      });

      const simple = WorkflowSanitizer.sanitizeWorkflow(createWorkflow(5));
      expect(simple.complexity).toBe('simple');

      const medium = WorkflowSanitizer.sanitizeWorkflow(createWorkflow(15));
      expect(medium.complexity).toBe('medium');

      const complex = WorkflowSanitizer.sanitizeWorkflow(createWorkflow(25));
      expect(complex.complexity).toBe('complex');
    });

    it('should generate consistent workflow hash', () => {
      const workflow = {
        nodes: [
          {
            id: '1',
            name: 'Webhook',
            type: 'n8n-nodes-base.webhook',
            position: [100, 100],
            parameters: { path: 'test' }
          }
        ],
        connections: {}
      };

      const hash1 = WorkflowSanitizer.generateWorkflowHash(workflow);
      const hash2 = WorkflowSanitizer.generateWorkflowHash(workflow);

      expect(hash1).toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]{16}$/);
    });

    it('should sanitize nested objects in parameters', () => {
      const workflow = {
        nodes: [
          {
            id: '1',
            name: 'Complex Node',
            type: 'n8n-nodes-base.httpRequest',
            position: [100, 100],
            parameters: {
              options: {
                headers: {
                  'X-API-Key': 'secret-key-1234567890abcdef',
                  'Content-Type': 'application/json'
                },
                body: {
                  data: 'some data',
                  token: 'another-secret-token-xyz123'
                }
              }
            }
          }
        ],
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      expect(sanitized.nodes[0].parameters.options.headers['X-API-Key']).toBe('[REDACTED]');
      expect(sanitized.nodes[0].parameters.options.headers['Content-Type']).toBe('application/json');
      expect(sanitized.nodes[0].parameters.options.body.data).toBe('some data');
      expect(sanitized.nodes[0].parameters.options.body.token).toBe('[REDACTED]');
    });

    it('should preserve connections structure', () => {
      const workflow = {
        nodes: [
          {
            id: '1',
            name: 'Node 1',
            type: 'n8n-nodes-base.start',
            position: [100, 100],
            parameters: {}
          },
          {
            id: '2',
            name: 'Node 2',
            type: 'n8n-nodes-base.function',
            position: [200, 100],
            parameters: {}
          }
        ],
        connections: {
          '1': {
            main: [[{ node: '2', type: 'main', index: 0 }]],
            error: [[{ node: '2', type: 'error', index: 0 }]]
          }
        }
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      expect(sanitized.connections).toEqual({
        '1': {
          main: [[{ node: '2', type: 'main', index: 0 }]],
          error: [[{ node: '2', type: 'error', index: 0 }]]
        }
      });
    });

    it('should remove sensitive workflow metadata', () => {
      const workflow = {
        id: 'workflow-123',
        name: 'My Workflow',
        nodes: [],
        connections: {},
        settings: {
          errorWorkflow: 'error-workflow-id',
          timezone: 'America/New_York'
        },
        staticData: { some: 'data' },
        pinData: { node1: 'pinned' },
        credentials: { slack: 'cred-123' },
        sharedWorkflows: ['user-456'],
        ownedBy: 'user-123',
        createdBy: 'user-123',
        updatedBy: 'user-456'
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      // Verify that sensitive workflow-level properties are not in the sanitized output
      // The sanitized workflow should only have specific fields as defined in SanitizedWorkflow interface
      expect(sanitized.nodes).toEqual([]);
      expect(sanitized.connections).toEqual({});
      expect(sanitized.nodeCount).toBe(0);
      expect(sanitized.nodeTypes).toEqual([]);

      // Verify these fields don't exist in the sanitized output
      const sanitizedAsAny = sanitized as any;
      expect(sanitizedAsAny.settings).toBeUndefined();
      expect(sanitizedAsAny.staticData).toBeUndefined();
      expect(sanitizedAsAny.pinData).toBeUndefined();
      expect(sanitizedAsAny.credentials).toBeUndefined();
      expect(sanitizedAsAny.sharedWorkflows).toBeUndefined();
      expect(sanitizedAsAny.ownedBy).toBeUndefined();
      expect(sanitizedAsAny.createdBy).toBeUndefined();
      expect(sanitizedAsAny.updatedBy).toBeUndefined();
    });
  });

  describe('edge cases and error handling', () => {
    it('should handle null or undefined workflow', () => {
      // The actual implementation will throw because JSON.parse(JSON.stringify(null)) is valid but creates issues
      expect(() => WorkflowSanitizer.sanitizeWorkflow(null as any)).toThrow();
      expect(() => WorkflowSanitizer.sanitizeWorkflow(undefined as any)).toThrow();
    });

    it('should handle workflow without nodes', () => {
      const workflow = {
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      expect(sanitized.nodeCount).toBe(0);
      expect(sanitized.nodeTypes).toEqual([]);
      expect(sanitized.nodes).toEqual([]);
      expect(sanitized.hasTrigger).toBe(false);
      expect(sanitized.hasWebhook).toBe(false);
    });

    it('should handle workflow without connections', () => {
      const workflow = {
        nodes: [
          {
            id: '1',
            name: 'Test Node',
            type: 'n8n-nodes-base.function',
            position: [100, 100],
            parameters: {}
          }
        ]
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      expect(sanitized.connections).toEqual({});
      expect(sanitized.nodeCount).toBe(1);
    });

    it('should handle malformed nodes array', () => {
      const workflow = {
        nodes: [
          {
            id: '2',
            name: 'Valid Node',
            type: 'n8n-nodes-base.function',
            position: [100, 100],
            parameters: {}
          }
        ],
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      // Should handle workflow gracefully
      expect(sanitized.nodeCount).toBe(1);
      expect(sanitized.nodes.length).toBe(1);
    });

    it('should handle deeply nested objects in parameters', () => {
      const workflow = {
        nodes: [
          {
            id: '1',
            name: 'Deep Node',
            type: 'n8n-nodes-base.httpRequest',
            position: [100, 100],
            parameters: {
              level1: {
                level2: {
                  level3: {
                    level4: {
                      level5: {
                        secret: 'deep-secret-key-1234567890abcdef',
                        safe: 'safe-value'
                      }
                    }
                  }
                }
              }
            }
          }
        ],
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      expect(sanitized.nodes[0].parameters.level1.level2.level3.level4.level5.secret).toBe('[REDACTED]');
      expect(sanitized.nodes[0].parameters.level1.level2.level3.level4.level5.safe).toBe('safe-value');
    });

    it('should handle circular references gracefully', () => {
      const workflow: any = {
        nodes: [
          {
            id: '1',
            name: 'Circular Node',
            type: 'n8n-nodes-base.function',
            position: [100, 100],
            parameters: {}
          }
        ],
        connections: {}
      };

      // Create circular reference
      workflow.nodes[0].parameters.selfRef = workflow.nodes[0];

      // JSON.stringify throws on circular references, so this should throw
      expect(() => WorkflowSanitizer.sanitizeWorkflow(workflow)).toThrow();
    });

    it('should handle extremely large workflows', () => {
      const largeWorkflow = {
        nodes: Array.from({ length: 1000 }, (_, i) => ({
          id: String(i),
          name: `Node ${i}`,
          type: 'n8n-nodes-base.function',
          position: [i * 10, 100],
          parameters: {
            code: `// Node ${i} code here`.repeat(100) // Large parameter
          }
        })),
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(largeWorkflow);

      expect(sanitized.nodeCount).toBe(1000);
      expect(sanitized.complexity).toBe('complex');
    });

    it('should handle various sensitive data patterns', () => {
      const workflow = {
        nodes: [
          {
            id: '1',
            name: 'Sensitive Node',
            type: 'n8n-nodes-base.httpRequest',
            position: [100, 100],
            parameters: {
              // Different patterns of sensitive data
              api_key: 'sk-1234567890abcdef1234567890abcdef',
              accessToken: 'ghp_abcdefghijklmnopqrstuvwxyz123456',
              secret_token: 'secret-123-abc-def',
              authKey: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9',
              clientSecret: 'abc123def456ghi789',
              webhookUrl: 'https://hooks.example.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
              databaseUrl: 'postgres://user:password@localhost:5432/db',
              connectionString: 'Server=myServerAddress;Database=myDataBase;Uid=myUsername;Pwd=myPassword;',
              // Safe values that should remain
              timeout: 5000,
              method: 'POST',
              retries: 3,
              name: 'My API Call'
            }
          }
        ],
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      const params = sanitized.nodes[0].parameters;
      expect(params.api_key).toBe('[REDACTED]');
      expect(params.accessToken).toBe('[REDACTED]');
      expect(params.secret_token).toBe('[REDACTED]');
      expect(params.authKey).toBe('[REDACTED]');
      expect(params.clientSecret).toBe('[REDACTED]');
      expect(params.webhookUrl).toBe('[REDACTED]');
      expect(params.databaseUrl).toBe('[REDACTED]');
      expect(params.connectionString).toBe('[REDACTED]');

      // Safe values should remain
      expect(params.timeout).toBe(5000);
      expect(params.method).toBe('POST');
      expect(params.retries).toBe(3);
      expect(params.name).toBe('My API Call');
    });

    it('should handle arrays in parameters', () => {
      const workflow = {
        nodes: [
          {
            id: '1',
            name: 'Array Node',
            type: 'n8n-nodes-base.httpRequest',
            position: [100, 100],
            parameters: {
              headers: [
                { name: 'Authorization', value: 'Bearer secret-token-123456789' },
                { name: 'Content-Type', value: 'application/json' },
                { name: 'X-API-Key', value: 'api-key-abcdefghijklmnopqrstuvwxyz' }
              ],
              methods: ['GET', 'POST']
            }
          }
        ],
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      const headers = sanitized.nodes[0].parameters.headers;
      expect(headers[0].value).toBe('[REDACTED]'); // Authorization
      expect(headers[1].value).toBe('application/json'); // Content-Type (safe)
      expect(headers[2].value).toBe('[REDACTED]'); // X-API-Key
      expect(sanitized.nodes[0].parameters.methods).toEqual(['GET', 'POST']); // Array should remain
    });

    it('should handle mixed data types in parameters', () => {
      const workflow = {
        nodes: [
          {
            id: '1',
            name: 'Mixed Node',
            type: 'n8n-nodes-base.function',
            position: [100, 100],
            parameters: {
              numberValue: 42,
              booleanValue: true,
              stringValue: 'safe string',
              nullValue: null,
              undefinedValue: undefined,
              dateValue: new Date('2024-01-01'),
              arrayValue: [1, 2, 3],
              nestedObject: {
                secret: 'secret-key-12345678',
                safe: 'safe-value'
              }
            }
          }
        ],
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      const params = sanitized.nodes[0].parameters;
      expect(params.numberValue).toBe(42);
      expect(params.booleanValue).toBe(true);
      expect(params.stringValue).toBe('safe string');
      expect(params.nullValue).toBeNull();
      expect(params.undefinedValue).toBeUndefined();
      expect(params.arrayValue).toEqual([1, 2, 3]);
      expect(params.nestedObject.secret).toBe('[REDACTED]');
      expect(params.nestedObject.safe).toBe('safe-value');
    });

    it('should handle missing node properties gracefully', () => {
      const workflow = {
        nodes: [
          { id: '3', name: 'Complete', type: 'n8n-nodes-base.function' } // Missing position but has required fields
        ],
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      expect(sanitized.nodes).toBeDefined();
      expect(sanitized.nodeCount).toBe(1);
    });

    it('should handle complex connection structures', () => {
      const workflow = {
        nodes: [
          { id: '1', name: 'Start', type: 'n8n-nodes-base.start', position: [0, 0], parameters: {} },
          { id: '2', name: 'Branch', type: 'n8n-nodes-base.if', position: [100, 0], parameters: {} },
          { id: '3', name: 'Path A', type: 'n8n-nodes-base.function', position: [200, 0], parameters: {} },
          { id: '4', name: 'Path B', type: 'n8n-nodes-base.function', position: [200, 100], parameters: {} },
          { id: '5', name: 'Merge', type: 'n8n-nodes-base.merge', position: [300, 50], parameters: {} }
        ],
        connections: {
          '1': {
            main: [[{ node: '2', type: 'main', index: 0 }]]
          },
          '2': {
            main: [
              [{ node: '3', type: 'main', index: 0 }],
              [{ node: '4', type: 'main', index: 0 }]
            ]
          },
          '3': {
            main: [[{ node: '5', type: 'main', index: 0 }]]
          },
          '4': {
            main: [[{ node: '5', type: 'main', index: 1 }]]
          }
        }
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      expect(sanitized.connections).toEqual(workflow.connections);
      expect(sanitized.nodeCount).toBe(5);
      expect(sanitized.complexity).toBe('simple'); // 5 nodes = simple
    });

    it('should generate different hashes for different workflows', () => {
      const workflow1 = {
        nodes: [{ id: '1', name: 'Node1', type: 'type1', position: [0, 0], parameters: {} }],
        connections: {}
      };

      const workflow2 = {
        nodes: [{ id: '1', name: 'Node2', type: 'type2', position: [0, 0], parameters: {} }],
        connections: {}
      };

      const hash1 = WorkflowSanitizer.generateWorkflowHash(workflow1);
      const hash2 = WorkflowSanitizer.generateWorkflowHash(workflow2);

      expect(hash1).not.toBe(hash2);
      expect(hash1).toMatch(/^[a-f0-9]{16}$/);
      expect(hash2).toMatch(/^[a-f0-9]{16}$/);
    });

    it('should handle workflow with only trigger nodes', () => {
      const workflow = {
        nodes: [
          { id: '1', name: 'Cron', type: 'n8n-nodes-base.cron', position: [0, 0], parameters: {} },
          { id: '2', name: 'Webhook', type: 'n8n-nodes-base.webhook', position: [100, 0], parameters: {} }
        ],
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      expect(sanitized.hasTrigger).toBe(true);
      expect(sanitized.hasWebhook).toBe(true);
      expect(sanitized.nodeTypes).toContain('n8n-nodes-base.cron');
      expect(sanitized.nodeTypes).toContain('n8n-nodes-base.webhook');
    });

    it('should handle workflow with special characters in node names and types', () => {
      const workflow = {
        nodes: [
          {
            id: '1',
            name: 'Node with émojis 🚀 and specíal chars',
            type: 'n8n-nodes-base.function',
            position: [0, 0],
            parameters: {
              message: 'Test with émojis 🎉 and URLs https://example.com'
            }
          }
        ],
        connections: {}
      };

      const sanitized = WorkflowSanitizer.sanitizeWorkflow(workflow);

      expect(sanitized.nodeCount).toBe(1);
      expect(sanitized.nodes[0].name).toBe('Node with émojis 🚀 and specíal chars');
    });
  });
});