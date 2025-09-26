/**
 * Universal Expression Validator
 *
 * Validates n8n expressions based on universal rules that apply to ALL expressions,
 * regardless of node type or field. This provides 100% reliable detection of
 * expression format issues without needing node-specific knowledge.
 */

export interface UniversalValidationResult {
  isValid: boolean;
  hasExpression: boolean;
  needsPrefix: boolean;
  isMixedContent: boolean;
  confidence: 1.0; // Universal rules have 100% confidence
  suggestion?: string;
  explanation: string;
}

export class UniversalExpressionValidator {
  private static readonly EXPRESSION_PATTERN = /\{\{[\s\S]+?\}\}/;
  private static readonly EXPRESSION_PREFIX = '=';

  /**
   * Universal Rule 1: Any field containing {{ }} MUST have = prefix
   * This is an absolute rule in n8n - no exceptions
   */
  static validateExpressionPrefix(value: any): UniversalValidationResult {
    // Only validate strings
    if (typeof value !== 'string') {
      return {
        isValid: true,
        hasExpression: false,
        needsPrefix: false,
        isMixedContent: false,
        confidence: 1.0,
        explanation: 'Not a string value'
      };
    }

    const hasExpression = this.EXPRESSION_PATTERN.test(value);

    if (!hasExpression) {
      return {
        isValid: true,
        hasExpression: false,
        needsPrefix: false,
        isMixedContent: false,
        confidence: 1.0,
        explanation: 'No n8n expression found'
      };
    }

    const hasPrefix = value.startsWith(this.EXPRESSION_PREFIX);
    const isMixedContent = this.hasMixedContent(value);

    if (!hasPrefix) {
      return {
        isValid: false,
        hasExpression: true,
        needsPrefix: true,
        isMixedContent,
        confidence: 1.0,
        suggestion: `${this.EXPRESSION_PREFIX}${value}`,
        explanation: isMixedContent
          ? 'Mixed literal text and expression requires = prefix for expression evaluation'
          : 'Expression requires = prefix to be evaluated'
      };
    }

    return {
      isValid: true,
      hasExpression: true,
      needsPrefix: false,
      isMixedContent,
      confidence: 1.0,
      explanation: 'Expression is properly formatted with = prefix'
    };
  }

  /**
   * Check if a string contains both literal text and expressions
   * Examples:
   * - "Hello {{ $json.name }}" -> mixed content
   * - "{{ $json.value }}" -> pure expression
   * - "https://api.com/{{ $json.id }}" -> mixed content
   */
  private static hasMixedContent(value: string): boolean {
    // Remove the = prefix if present for analysis
    const content = value.startsWith(this.EXPRESSION_PREFIX)
      ? value.substring(1)
      : value;

    // Check if there's any content outside of {{ }}
    const withoutExpressions = content.replace(/\{\{[\s\S]+?\}\}/g, '');
    return withoutExpressions.trim().length > 0;
  }

  /**
   * Universal Rule 2: Expression syntax validation
   * Check for common syntax errors that prevent evaluation
   */
  static validateExpressionSyntax(value: string): UniversalValidationResult {
    // First, check if there's any expression pattern at all
    const hasAnyBrackets = value.includes('{{') || value.includes('}}');

    if (!hasAnyBrackets) {
      return {
        isValid: true,
        hasExpression: false,
        needsPrefix: false,
        isMixedContent: false,
        confidence: 1.0,
        explanation: 'No expression to validate'
      };
    }

    // Check for unclosed brackets in the entire string
    const openCount = (value.match(/\{\{/g) || []).length;
    const closeCount = (value.match(/\}\}/g) || []).length;

    if (openCount !== closeCount) {
      return {
        isValid: false,
        hasExpression: true,
        needsPrefix: false,
        isMixedContent: false,
        confidence: 1.0,
        explanation: `Unmatched expression brackets: ${openCount} opening, ${closeCount} closing`
      };
    }

    // Extract properly matched expressions for further validation
    const expressions = value.match(/\{\{[\s\S]+?\}\}/g) || [];

    for (const expr of expressions) {
      // Check for empty expressions
      const content = expr.slice(2, -2).trim();
      if (!content) {
        return {
          isValid: false,
          hasExpression: true,
          needsPrefix: false,
          isMixedContent: false,
          confidence: 1.0,
          explanation: 'Empty expression {{ }} is not valid'
        };
      }
    }

    return {
      isValid: true,
      hasExpression: expressions.length > 0,
      needsPrefix: false,
      isMixedContent: this.hasMixedContent(value),
      confidence: 1.0,
      explanation: 'Expression syntax is valid'
    };
  }

  /**
   * Universal Rule 3: Common n8n expression patterns
   * Validate against known n8n expression patterns
   */
  static validateCommonPatterns(value: string): UniversalValidationResult {
    if (!this.EXPRESSION_PATTERN.test(value)) {
      return {
        isValid: true,
        hasExpression: false,
        needsPrefix: false,
        isMixedContent: false,
        confidence: 1.0,
        explanation: 'No expression to validate'
      };
    }

    const expressions = value.match(/\{\{[\s\S]+?\}\}/g) || [];
    const warnings: string[] = [];

    for (const expr of expressions) {
      const content = expr.slice(2, -2).trim();

      // Check for common mistakes
      if (content.includes('${') && content.includes('}')) {
        warnings.push(`Template literal syntax \${} found - use n8n syntax instead: ${expr}`);
      }

      if (content.startsWith('=')) {
        warnings.push(`Double prefix detected in expression: ${expr}`);
      }

      if (content.includes('{{') || content.includes('}}')) {
        warnings.push(`Nested brackets detected: ${expr}`);
      }
    }

    if (warnings.length > 0) {
      return {
        isValid: false,
        hasExpression: true,
        needsPrefix: false,
        isMixedContent: false,
        confidence: 1.0,
        explanation: warnings.join('; ')
      };
    }

    return {
      isValid: true,
      hasExpression: true,
      needsPrefix: false,
      isMixedContent: this.hasMixedContent(value),
      confidence: 1.0,
      explanation: 'Expression patterns are valid'
    };
  }

  /**
   * Perform all universal validations
   */
  static validate(value: any): UniversalValidationResult[] {
    const results: UniversalValidationResult[] = [];

    // Run all universal validators
    const prefixResult = this.validateExpressionPrefix(value);
    if (!prefixResult.isValid) {
      results.push(prefixResult);
    }

    if (typeof value === 'string') {
      const syntaxResult = this.validateExpressionSyntax(value);
      if (!syntaxResult.isValid) {
        results.push(syntaxResult);
      }

      const patternResult = this.validateCommonPatterns(value);
      if (!patternResult.isValid) {
        results.push(patternResult);
      }
    }

    // If no issues found, return a success result
    if (results.length === 0) {
      results.push({
        isValid: true,
        hasExpression: prefixResult.hasExpression,
        needsPrefix: false,
        isMixedContent: prefixResult.isMixedContent,
        confidence: 1.0,
        explanation: prefixResult.hasExpression
          ? 'Expression is valid'
          : 'No expression found'
      });
    }

    return results;
  }

  /**
   * Get a corrected version of the value
   */
  static getCorrectedValue(value: string): string {
    if (!this.EXPRESSION_PATTERN.test(value)) {
      return value;
    }

    if (!value.startsWith(this.EXPRESSION_PREFIX)) {
      return `${this.EXPRESSION_PREFIX}${value}`;
    }

    return value;
  }
}