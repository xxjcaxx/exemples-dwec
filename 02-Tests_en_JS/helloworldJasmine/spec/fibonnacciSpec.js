describe('Fibonacci', function() {
  
      it('Ha de retornar un array', function() {
        expect(Array.isArray(fibonacci(5))).toBe(true);
      });
      it('Ha de resoldre  [0]', function() {
        expect(fibonacci(0)).toEqual([0]);
      });
      it('Ha de resoldre  [0,1]', function() {
        expect(fibonacci(1)).toEqual([0,1]);
      });

   });
   