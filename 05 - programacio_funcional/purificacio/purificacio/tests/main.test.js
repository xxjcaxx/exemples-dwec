import {describe, expect, test } from "vitest";

import { ordernarArray,mostrarEstat } from "../src/dades";

describe("Funcions del main", function () {
    describe("manipulació de dades", function () {
      const arrayTest = [0,0,10,1,1,2,3,4];
      test("La funció deuria retornar un array", function () {
        expect(ordernarArray(arrayTest)).toBeInstanceOf(Array);
      });
      test("La funció deuria retornar un array ordenat", function () {
        expect(ordernarArray(arrayTest)).toEqual([0,0,1,1,2,3,4,10]);
      });
       test("La funció no deuria mutar l'array original", function () {
        ordernarArray(arrayTest)
        expect(arrayTest).toEqual([0,0,10,1,1,2,3,4]);
        expect(ordernarArray(arrayTest)).not.toBe(arrayTest)
      });
    });
});
