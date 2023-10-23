import { incrementar, decrementar } from "../src/index.js";

describe('Test Promeses', function() {
    describe('incrementar decrementar', function() {
      it('should return the number +1', function() {
        expect(incrementar(1)).toBe(2);
        expect(incrementar(1000)).toBe(1001);
      });
      it('should return the number -1', function() {
        expect(decrementar(1)).toBe(0);
        expect(decrementar(1000)).toBe(999);
      });
    });
   });
   