import { describe, it, expect } from 'vitest';
import { ExpressionFormatValidator } from '../../../src/services/expression-format-validator';

describe('ExpressionFormatValidator', () => {
  describe('validateAndFix', () => {
    const context = {
      nodeType: 'n8n-nodes-base.httpRequest',
      nodeName: 'HTTP Request',
      nodeId: 'test-id-1'
    };

    describe('Simple string expressions', () => {
      it('should detect missing = prefix for expression', () => {
        const value = '{{ $env.API_KEY }}';
        const issue = ExpressionFormatValidator.validateAndFix(value, 'apiKey', context);

        expect(issue).toBeTruthy();
        expect(issue?.issueType).toBe('missing-prefix');
        expect(issue?.correctedValue).toBe('={{ $env.API_KEY }}');
        expect(issue?.severity).toBe('error');
      });

      it('should accept expression with = prefix', () => {
        const value = '={{ $env.API_KEY }}';
        const issue = ExpressionFormatValidator.validateAndFix(value, 'apiKey', context);

        expect(issue).toBeNull();
      });

      it('should detect mixed content without prefix', () => {
        const value = 'Bearer {{ $env.TOKEN }}';
        const issue = ExpressionFormatValidator.validateAndFix(value, 'authorization', context);

        expect(issue).toBeTruthy();
        expect(issue?.issueType).toBe('missing-prefix');
        expect(issue?.correctedValue).toBe('=Bearer {{ $env.TOKEN }}');
      });

      it('should accept mixed content with prefix', () => {
        const value = '=Bearer {{ $env.TOKEN }}';
        const issue = ExpressionFormatValidator.validateAndFix(value, 'authorization', context);

        expect(issue).toBeNull();
      });

      it('should ignore plain strings without expressions', () => {
        const value = 'https://api.example.com';
        const issue = ExpressionFormatValidator.validateAndFix(value, 'url', context);

        expect(issue).toBeNull();
      });
    });

    describe('Resource Locator fields', () => {
      const githubContext = {
        nodeType: 'n8n-nodes-base.github',
        nodeName: 'GitHub',
        nodeId: 'github-1'
      };

      it('should detect expression in owner field needing resource locator', () => {
        const value = '{{ $vars.GITHUB_OWNER }}';
        const issue = ExpressionFormatValidator.validateAndFix(value, 'owner', githubContext);

        expect(issue).toBeTruthy();
        expect(issue?.issueType).toBe('needs-resource-locator');
        expect(issue?.correctedValue).toEqual({
          __rl: true,
          value: '={{ $vars.GITHUB_OWNER }}',
          mode: 'expression'
        });
        expect(issue?.severity).toBe('error');
      });

      it('should accept resource locator with expression', () => {
        const value = {
          __rl: true,
          value: '={{ $vars.GITHUB_OWNER }}',
          mode: 'expression'
        };
        const issue = ExpressionFormatValidator.validateAndFix(value, 'owner', githubContext);

        expect(issue).toBeNull();
      });

      it('should detect missing prefix in resource locator value', () => {
        const value = {
          __rl: true,
          value: '{{ $vars.GITHUB_OWNER }}',
          mode: 'expression'
        };
        const issue = ExpressionFormatValidator.validateAndFix(value, 'owner', githubContext);

        expect(issue).toBeTruthy();
        expect(issue?.issueType).toBe('missing-prefix');
        expect(issue?.correctedValue.value).toBe('={{ $vars.GITHUB_OWNER }}');
      });

      it('should warn if expression has prefix but should use RL format', () => {
        const value = '={{ $vars.GITHUB_OWNER }}';
        const issue = ExpressionFormatValidator.validateAndFix(value, 'owner', githubContext);

        expect(issue).toBeTruthy();
        expect(issue?.issueType).toBe('needs-resource-locator');
        expect(issue?.severity).toBe('warning');
      });
    });

    describe('Multiple expressions', () => {
      it('should detect multiple expressions without prefix', () => {
        const value = '{{ $json.first }} - {{ $json.last }}';
        const issue = ExpressionFormatValidator.validateAndFix(value, 'fullName', context);

        expect(issue).toBeTruthy();
        expect(issue?.issueType).toBe('missing-prefix');
        expect(issue?.correctedValue).toBe('={{ $json.first }} - {{ $json.last }}');
      });

      it('should accept multiple expressions with prefix', () => {
        const value = '={{ $json.first }} - {{ $json.last }}';
        const issue = ExpressionFormatValidator.validateAndFix(value, 'fullName', context);

        expect(issue).toBeNull();
      });
    });

    describe('Edge cases', () => {
      it('should handle null values', () => {
        const issue = ExpressionFormatValidator.validateAndFix(null, 'field', context);
        expect(issue).toBeNull();
      });

      it('should handle undefined values', () => {
        const issue = ExpressionFormatValidator.validateAndFix(undefined, 'field', context);
        expect(issue).toBeNull();
      });

      it('should handle empty strings', () => {
        const issue = ExpressionFormatValidator.validateAndFix('', 'field', context);
        expect(issue).toBeNull();
      });

      it('should handle numbers', () => {
        const issue = ExpressionFormatValidator.validateAndFix(42, 'field', context);
        expect(issue).toBeNull();
      });

      it('should handle booleans', () => {
        const issue = ExpressionFormatValidator.validateAndFix(true, 'field', context);
        expect(issue).toBeNull();
      });

      it('should handle arrays', () => {
        const issue = ExpressionFormatValidator.validateAndFix(['item1', 'item2'], 'field', context);
        expect(issue).toBeNull();
      });
    });
  });

  describe('validateNodeParameters', () => {
    const context = {
      nodeType: 'n8n-nodes-base.emailSend',
      nodeName: 'Send Email',
      nodeId: 'email-1'
    };

    it('should validate all parameters recursively', () => {
      const parameters = {
        fromEmail: '{{ $env.SENDER_EMAIL }}',
        toEmail: 'user@example.com',
        subject: 'Test {{ $json.type }}',
        body: {
          html: '<p>Hello {{ $json.name }}</p>',
          text: 'Hello {{ $json.name }}'
        },
        options: {
          replyTo: '={{ $env.REPLY_EMAIL }}'
        }
      };

      const issues = ExpressionFormatValidator.validateNodeParameters(parameters, context);

      expect(issues).toHaveLength(4);
      expect(issues.map(i => i.fieldPath)).toContain('fromEmail');
      expect(issues.map(i => i.fieldPath)).toContain('subject');
      expect(issues.map(i => i.fieldPath)).toContain('body.html');
      expect(issues.map(i => i.fieldPath)).toContain('body.text');
    });

    it('should handle arrays with expressions', () => {
      const parameters = {
        recipients: [
          '{{ $json.email1 }}',
          'static@example.com',
          '={{ $json.email2 }}'
        ]
      };

      const issues = ExpressionFormatValidator.validateNodeParameters(parameters, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].fieldPath).toBe('recipients[0]');
      expect(issues[0].correctedValue).toBe('={{ $json.email1 }}');
    });

    it('should handle nested objects', () => {
      const parameters = {
        config: {
          database: {
            host: '{{ $env.DB_HOST }}',
            port: 5432,
            name: 'mydb'
          }
        }
      };

      const issues = ExpressionFormatValidator.validateNodeParameters(parameters, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].fieldPath).toBe('config.database.host');
    });

    it('should skip circular references', () => {
      const circular: any = { a: 1 };
      circular.self = circular;

      const parameters = {
        normal: '{{ $json.value }}',
        circular
      };

      const issues = ExpressionFormatValidator.validateNodeParameters(parameters, context);

      // Should only find the issue in 'normal', not crash on circular
      expect(issues).toHaveLength(1);
      expect(issues[0].fieldPath).toBe('normal');
    });

    it('should handle maximum recursion depth', () => {
      // Create a deeply nested object (105 levels deep, exceeding the limit of 100)
      let deepObject: any = { value: '{{ $json.data }}' };
      let current = deepObject;
      for (let i = 0; i < 105; i++) {
        current.nested = { value: `{{ $json.level${i} }}` };
        current = current.nested;
      }

      const parameters = {
        deep: deepObject
      };

      const issues = ExpressionFormatValidator.validateNodeParameters(parameters, context);

      // Should find expression format issues up to the depth limit
      const depthWarning = issues.find(i => i.explanation.includes('Maximum recursion depth'));
      expect(depthWarning).toBeTruthy();
      expect(depthWarning?.severity).toBe('warning');

      // Should still find some expression format errors before hitting the limit
      const formatErrors = issues.filter(i => i.issueType === 'missing-prefix');
      expect(formatErrors.length).toBeGreaterThan(0);
      expect(formatErrors.length).toBeLessThanOrEqual(100); // Should not exceed the depth limit
    });
  });

  describe('formatErrorMessage', () => {
    const context = {
      nodeType: 'n8n-nodes-base.github',
      nodeName: 'Create Issue',
      nodeId: 'github-1'
    };

    it('should format error message for missing prefix', () => {
      const issue = {
        fieldPath: 'title',
        currentValue: '{{ $json.title }}',
        correctedValue: '={{ $json.title }}',
        issueType: 'missing-prefix' as const,
        explanation: "Expression missing required '=' prefix.",
        severity: 'error' as const
      };

      const message = ExpressionFormatValidator.formatErrorMessage(issue, context);

      expect(message).toContain("Expression format error in node 'Create Issue'");
      expect(message).toContain('Field \'title\'');
      expect(message).toContain('Current (incorrect):');
      expect(message).toContain('"title": "{{ $json.title }}"');
      expect(message).toContain('Fixed (correct):');
      expect(message).toContain('"title": "={{ $json.title }}"');
    });

    it('should format error message for resource locator', () => {
      const issue = {
        fieldPath: 'owner',
        currentValue: '{{ $vars.OWNER }}',
        correctedValue: {
          __rl: true,
          value: '={{ $vars.OWNER }}',
          mode: 'expression'
        },
        issueType: 'needs-resource-locator' as const,
        explanation: 'Field needs resource locator format.',
        severity: 'error' as const
      };

      const message = ExpressionFormatValidator.formatErrorMessage(issue, context);

      expect(message).toContain("Expression format error in node 'Create Issue'");
      expect(message).toContain('Current (incorrect):');
      expect(message).toContain('"owner": "{{ $vars.OWNER }}"');
      expect(message).toContain('Fixed (correct):');
      expect(message).toContain('"__rl": true');
      expect(message).toContain('"value": "={{ $vars.OWNER }}"');
      expect(message).toContain('"mode": "expression"');
    });
  });

  describe('Real-world examples', () => {
    it('should validate Email Send node example', () => {
      const context = {
        nodeType: 'n8n-nodes-base.emailSend',
        nodeName: 'Error Handler',
        nodeId: 'b9dd1cfd-ee66-4049-97e7-1af6d976a4e0'
      };

      const parameters = {
        fromEmail: '{{ $env.ADMIN_EMAIL }}',
        toEmail: 'admin@company.com',
        subject: 'GitHub Issue Workflow Error - HIGH PRIORITY',
        options: {}
      };

      const issues = ExpressionFormatValidator.validateNodeParameters(parameters, context);

      expect(issues).toHaveLength(1);
      expect(issues[0].fieldPath).toBe('fromEmail');
      expect(issues[0].correctedValue).toBe('={{ $env.ADMIN_EMAIL }}');
    });

    it('should validate GitHub node example', () => {
      const context = {
        nodeType: 'n8n-nodes-base.github',
        nodeName: 'Send Welcome Comment',
        nodeId: '3c742ca1-af8f-4d80-a47e-e68fb1ced491'
      };

      const parameters = {
        operation: 'createComment',
        owner: '{{ $vars.GITHUB_OWNER }}',
        repository: '{{ $vars.GITHUB_REPO }}',
        issueNumber: null,
        body: '👋 Hi @{{ $(\'Extract Issue Data\').first().json.author }}!\n\nThank you for creating this issue.'
      };

      const issues = ExpressionFormatValidator.validateNodeParameters(parameters, context);

      expect(issues.length).toBeGreaterThan(0);
      expect(issues.some(i => i.fieldPath === 'owner')).toBe(true);
      expect(issues.some(i => i.fieldPath === 'repository')).toBe(true);
      expect(issues.some(i => i.fieldPath === 'body')).toBe(true);
    });
  });
});