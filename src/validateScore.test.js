import { describe, it, expect } from 'vitest';
import { validateScore } from './validateScore';

describe('validateScore Function', () => {
  // Basic Validation Tests
  describe('Basic Validation', () => {
    it('Should validate a normal score', () => {
      const result = validateScore(75);
      expect(result.valid).toBe(true);
      expect(result.score).toBe(75);
      expect(result.passed).toBe(true);
      expect(result.grade).toBe('C');
    });

    it('Should reject undefined score', () => {
      const result = validateScore(undefined);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score ist erforderlich');
    });

    it('Should reject null score', () => {
      const result = validateScore(null);
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score ist erforderlich');
    });

    it('Should reject non-numeric score', () => {
      const result = validateScore('75');
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score muss eine Zahl sein');
    });

    it('Should reject scores outside 0-100 range', () => {
      const lowResult = validateScore(-1);
      expect(lowResult.valid).toBe(false);
      expect(lowResult.errors).toContain('Score muss zwischen 0 und 100 liegen');

      const highResult = validateScore(101);
      expect(highResult.valid).toBe(false);
      expect(highResult.errors).toContain('Score muss zwischen 0 und 100 liegen');
    });
  });

  // Strict Mode Validation Tests
  describe('Strict Mode Validation', () => {
    it('Should reject NaN in strict mode', () => {
      const result = validateScore(NaN, { strictMode: true });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score muss eine gültige Zahl sein');
    });

    it('Should reject non-integer scores in strict mode', () => {
      const result = validateScore(75.5, { strictMode: true });
      expect(result.valid).toBe(false);
      expect(result.errors).toContain('Score muss eine ganze Zahl sein');
    });

    it('Should accept integer scores in strict mode', () => {
      const result = validateScore(75, { strictMode: true });
      expect(result.valid).toBe(true);
    });
  });

  // Bonus Categories Tests
  describe('Bonus Categories', () => {
    it('Should add bonus points for bonus categories', () => {
      const result = validateScore(80, { 
        bonusCategories: ['participation', 'extra-credit'] 
      });
      expect(result.score).toBe(84);
      expect(result.passed).toBe(true);
    });

    it('Should cap bonus points at 10', () => {
      const result = validateScore(90, { 
        bonusCategories: ['a', 'b', 'c', 'd', 'e', 'f'] 
      });
      expect(result.score).toBe(100);
    });
  });

  // Passing Score Tests
  describe('Custom Passing Score', () => {
    it('Should use custom passing score', () => {
      const result = validateScore(50, { passingScore: 55 });
      expect(result.passed).toBe(false);

      const passingResult = validateScore(55, { passingScore: 55 });
      expect(passingResult.passed).toBe(true);
    });
  });

  // Grade Calculation Tests
  describe('Grade Calculation', () => {
    const gradeTestCases = [
      { score: 95, expectedGrade: 'A' },
      { score: 85, expectedGrade: 'B' },
      { score: 75, expectedGrade: 'C' },
      { score: 65, expectedGrade: 'D' },
      { score: 55, expectedGrade: 'F' }
    ];

    gradeTestCases.forEach(({ score, expectedGrade }) => {
      it(`Should calculate grade ${expectedGrade} for score ${score}`, () => {
        const result = validateScore(score);
        expect(result.grade).toBe(expectedGrade);
      });
    });
  });

  // Edge Cases
  describe('Edge Cases', () => {
    it('Should handle score at minimum passing threshold', () => {
      const result = validateScore(60);
      expect(result.passed).toBe(true);
      expect(result.grade).toBe('D');
    });

    it('Should handle score at maximum possible score', () => {
      const result = validateScore(100);
      expect(result.passed).toBe(true);
      expect(result.grade).toBe('A');
    });
  });
});
