import { describe, expect, test } from "vitest";

import { arrays, numeric } from "./index";

describe("Exemples Vitest", () => {
    describe("Numeric", () => {
        test("numeric ha de retornar un número", () => {
            expect(typeof numeric(1, 2)).toBe('number')
        });
        test("numeric ha de retornar la suma", () => {
            expect(numeric(1, 2)).toBe(3);
        });
        test("numeric espera dos argument", () => {
            expect(numeric()).toBe(NaN);
            expect(numeric(1)).toBe(NaN);
        });
        // Afegit en la segona iteració
        test("Si no passem números no funciona", () => {
            expect(numeric("a", "b")).toBe(NaN);
        });
    });
    describe("Arrays", () => {
        test("arrays ha de retornar un array", () => {
            expect(arrays([1, 2], [3, 4])).toBeInstanceOf(Array);
        });
        test("arrays ha de retornar un array concatenat", () => {
            expect(arrays([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
        });
        test("arrays ha de retornar un array que no siga cap dels que entren", () => {
            const a = [1, 2];
            const b = [3, 4];
            expect(arrays(a, b)).not.toBe(a);
            expect(arrays(a, b)).not.toBe(b);
        });

    });
});

