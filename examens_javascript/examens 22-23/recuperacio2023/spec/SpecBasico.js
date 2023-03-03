describe("Rotacion", function () {
    describe("Rotacion", function () {
        it("Debe retornar las rotaciones", function () {
            expect(rotar(rotations)(original)).toEqual([["a","b","c","d","e","f","g","h","i"],["a","d","g","b","e","h","c","f","i"],["g","d","a","h","e","b","i","f","c"],["g","h","i","d","e","f","a","b","c"],["i","h","g","f","e","d","c","b","a"],["i","f","c","h","e","b","g","d","a"],["c","f","i","b","e","h","a","d","g"],["c","b","a","f","e","d","i","h","g"]]);
        });
      
    });

  


});