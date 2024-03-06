import { createArray } from "../src/functions.js";
import { getMainTemplate } from "../src/mainTemplate.js";


describe('Array', function() {
   describe('createArray', function() {
     it('should return [0,0,0]', function() {
       expect(createArray(3)).toEqual([0,0,0]);
     });
   });
  });


  describe('Template', function() {
    describe('Main Template', function() {
      it('should return template', function() {
        expect(typeof(getMainTemplate()) == 'string').toBe(true)
      });
    });
   });