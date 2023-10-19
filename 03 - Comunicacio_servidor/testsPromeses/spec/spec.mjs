import { incrementar, decrementar, getData } from "../src/index.js";

describe('Test Promeses', function() {
    describe('incrementar decrementar', function() {
      it('should return the number +1', async function() {
        expect(await incrementar(1)).toBe(2);
        expect(await incrementar(1000)).toBe(1001);
      });
      it('should return the number -1', async function() {
        expect(await decrementar(1)).toBe(0);
        expect(await decrementar(1000)).toBe(999);
      });
    });
    describe('fetch', function() {
        it('should return the data', async function() {
          expect(getData('dades.json').catch((error)=> console.log(error))).toBeInstanceOf(Promise);
          expect(await getData('http://127.0.0.1:5500/03%20-%20Comunicacio_servidor/testsPromeses/src/dades.json')).toEqual([10,20,30,40,50]);
        });
    
      });
   });
   