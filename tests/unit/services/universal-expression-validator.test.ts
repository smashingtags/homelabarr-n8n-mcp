import { describe, it, expect } from 'vitest';
import { UniversalExpressionValidator } from '../../../src/services/universal-expression-validator';

describe('UniversalExpressionValidator', () => {
  describe('validateExpressionPrefix', () => {
    it('should detect missing prefix in pure expression', () => {
      const result = UniversalExpressionValidator.validateExpressionPrefix('{{ $json.value }}');

      expect(result.isValid).toBe(false);
      expect(result.hasExpression).toBe(true);
      expect(result.needsPrefix).toBe(true);
      expect(result.isMixedContent).toBe(false);
      expect(result.confidence).toBe(1.0);
      expect(result.suggestion).toBe('={{ $json.value }}');
    });

    it('should detect missing prefix in mixed content', () => {
      const result = UniversalExpressionValidator.validateExpressionPrefix(
        'Hello {{ $json.name }}'
      );

      expect(result.isValid).toBe(false);
      expect(result.hasExpression).toBe(true);
      expect(result.needsPrefix).toBe(true);
      expect(result.isMixedContent).toBe(true);
      expect(result.confidence).toBe(1.0);
      expect(result.suggestion).toBe('=Hello {{ $json.name }}');
    });

    it('should accept properly prefixed expression', () => {
      const result = UniversalExpressionValidator.validateExpressionPrefix('={{ $json.value }}');

      expect(result.isValid).toBe(true);
      expect(result.hasExpression).toBe(true);
      expect(result.needsPrefix).toBe(false);
      expect(result.confidence).toBe(1.0);
    });

    it('should accept properly prefixed mixed content', () => {
      const result = UniversalExpressionValidator.validateExpressionPrefix(
        '=Hello {{ $json.name }}!'
      );

      expect(result.isValid).toBe(true);
      expect(result.hasExpression).toBe(true);
      expect(result.isMixedContent).toBe(true);
      expect(result.confidence).toBe(1.0);
    });

    it('should ignore non-string values', () => {
      const result = UniversalExpressionValidator.validateExpressionPrefix(123);

      expect(result.isValid).toBe(true);
      expect(result.hasExpression).toBe(false);
      expect(result.confidence).toBe(1.0);
    });

    it('should ignore strings without expressions', () => {
      const result = UniversalExpressionValidator.validateExpressionPrefix('plain text');

      expect(result.isValid).toBe(true);
      expect(result.hasExpression).toBe(false);
      expect(result.confidence).toBe(1.0);
    });
  });

  describe('validateExpressionSyntax', () => {
    it('should detect unclosed brackets', () => {
      const result = UniversalExpressionValidator.validateExpressionSyntax('={{ $json.value }');

      expect(result.isValid).toBe(false);
      expect(result.explanation).toContain('Unmatched expression brackets');
    });

    it('should detect empty expressions', () => {
      const result = UniversalExpressionValidator.validateExpressionSyntax('={{  }}');

      expect(result.isValid).toBe(false);
      expect(result.explanation).toContain('Empty expression');
    });

    it('should accept valid syntax', () => {
      const result = UniversalExpressionValidator.validateExpressionSyntax('={{ $json.value }}');

      expect(result.isValid).toBe(true);
      expect(result.hasExpression).toBe(true);
    });

    it('should handle multiple expressions', () => {
      const result = UniversalExpressionValidator.validateExpressionSyntax(
        '={{ $json.first }} and {{ $json.second }}'
      );

      expect(result.isValid).toBe(true);
      expect(result.hasExpression).toBe(true);
      expect(result.isMixedContent).toBe(true);
    });
  });

  describe('validateCommonPatterns', () => {
    it('should detect template literal syntax', () => {
      const result = UniversalExpressionValidator.validateCommonPatterns('={{ ${json.value} }}');

      expect(result.isValid).toBe(false);
      expect(result.explanation).toContain('Template literal syntax');
    });

    it('should detect double prefix', () => {
      const result = UniversalExpressionValidator.validateCommonPatterns('={{ =$json.value }}');

      expect(result.isValid).toBe(false);
      expect(result.explanation).toContain('Double prefix');
    });

    it('should detect nested brackets', () => {
      const result = UniversalExpressionValidator.validateCommonPatterns(
        '={{ $json.items[{{ $json.index }}] }}'
      );

      expect(result.isValid).toBe(false);
      expect(result.explanation).toContain('Nested brackets');
    });

    it('should accept valid patterns', () => {
      const result = UniversalExpressionValidator.validateCommonPatterns(
        '={{ $json.items[$json.index] }}'
      );

      expect(result.isValid).toBe(true);
    });
  });

  describe('validate (comprehensive)', () => {
    it('should return all validation issues', () => {
      const results = UniversalExpressionValidator.validate('{{ ${json.value} }}');

      expect(results.length).toBeGreaterThan(0);
      const issues = results.filter(r => !r.isValid);
      expect(issues.length).toBeGreaterThan(0);

      // Should detect both missing prefix and template literal syntax
      const prefixIssue = issues.find(i => i.needsPrefix);
      const patternIssue = issues.find(i => i.explanation.includes('Template literal'));

      expect(prefixIssue).toBeTruthy();
      expect(patternIssue).toBeTruthy();
    });

    it('should return success for valid expression', () => {
      const results = UniversalExpressionValidator.validate('={{ $json.value }}');

      expect(results).toHaveLength(1);
      expect(results[0].isValid).toBe(true);
      expect(results[0].confidence).toBe(1.0);
    });

    it('should handle non-expression strings', () => {
      const results = UniversalExpressionValidator.validate('plain text');

      expect(results).toHaveLength(1);
      expect(results[0].isValid).toBe(true);
      expect(results[0].hasExpression).toBe(false);
    });
  });

  describe('getCorrectedValue', () => {
    it('should add prefix to expression', () => {
      const corrected = UniversalExpressionValidator.getCorrectedValue('{{ $json.value }}');
      expect(corrected).toBe('={{ $json.value }}');
    });

    it('should add prefix to mixed content', () => {
      const corrected = UniversalExpressionValidator.getCorrectedValue(
        'Hello {{ $json.name }}'
      );
      expect(corrected).toBe('=Hello {{ $json.name }}');
    });

    it('should not modify already prefixed expressions', () => {
      const corrected = UniversalExpressionValidator.getCorrectedValue('={{ $json.value }}');
      expect(corrected).toBe('={{ $json.value }}');
    });

    it('should not modify non-expressions', () => {
      const corrected = UniversalExpressionValidator.getCorrectedValue('plain text');
      expect(corrected).toBe('plain text');
    });
  });

  describe('hasMixedContent', () => {
    it('should detect URLs with expressions', () => {
      const result = UniversalExpressionValidator.validateExpressionPrefix(
        'https://api.example.com/users/{{ $json.id }}'
      );
      expect(result.isMixedContent).toBe(true);
    });

    it('should detect text with expressions', () => {
      const result = UniversalExpressionValidator.validateExpressionPrefix(
        'Welcome {{ $json.name }} to our service'
      );
      expect(result.isMixedContent).toBe(true);
    });

    it('should identify pure expressions', () => {
      const result = UniversalExpressionValidator.validateExpressionPrefix('{{ $json.value }}');
      expect(result.isMixedContent).toBe(false);
    });

    it('should identify pure expressions with spaces', () => {
      const result = UniversalExpressionValidator.validateExpressionPrefix(
        '  {{ $json.value }}  '
      );
      expect(result.isMixedContent).toBe(false);
    });
  });
});