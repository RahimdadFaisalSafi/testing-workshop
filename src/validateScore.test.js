import { describe, it, expect } from "vitest";
import { validateScore } from "./validateScore";

describe("validateScore", () => {
    // Basic validation
    describe("Basic Validation", () => {
        it("Should validate a normal score", () => {
            const result = validateScore(75);
            expect(result.valid).toBe(true);
            expect(result.score).toBe(75);
            expect(result.passed).toBe(true);
            expect(result.grade).toBe("C");
            expect(result.errors).toEqual([]);
        });

        it("Should reject undefined score", () => {
            const result = validateScore(undefined);
            expect(result.valid).toBe(false);
            expect(result.errors).toEqual(["Score ist erforderlich"]);
        });

        it("Should reject null score", () => {
            const result = validateScore(null);
            expect(result.valid).toBe(false);
            expect(result.errors).toEqual(["Score ist erforderlich"]);
        });

        it("Should reject non-numeric score", () => {
            const result = validateScore("75");
            expect(result.valid).toBe(false);
            expect(result.errors).toEqual(["Score muss eine Zahl sein"]);
        });
        
        it("Should reject outside 0-100 range", () => {
            const lowResult = validateScore(-1);
            expect(lowResult.valid).toBe(false);
            expect(lowResult.errors).toEqual(["Score muss zwischen 0 und 100 liegen"]);

            const highResult = validateScore(101);
            expect(highResult.valid).toBe(false);
            expect(highResult.errors).toEqual(["Score muss zwischen 0 und 100 liegen"]);
        });
        
    });

});