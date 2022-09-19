describe("Javascript Basico", function () {
    describe("Arrays",function(){
    it("Ejercicio 1: Debe devolver un array con tantos 0 como se indique por parámetros", function () {
        expect(ejercicio1(3)).toEqual([0, 0, 0]);
    });
    it("Ejercicio 1 (2): Debe devolver un array con tantos 0 como se indique por parámetros", function () {
        expect(ejercicio1(5)).toEqual([0, 0, 0, 0, 0]);
    });

    it("Ejercicio 2: Debe indicar si una string está en un array", function () {
        expect(ejercicio2(["a","b","c"],"a")).toBe(true);
        expect(ejercicio2(["a","b","c"],"d")).toBe(false);
    });
    it("Ejercicio 3: Debe devolver el primer elemento par de un array", function () {
        expect(ejercicio3([1,2,3,4])).toBe(2);
    });
    it("Ejercicio 4: Debe devolver el primer elemento primo de un array", function () {
        expect(ejercicio3([10,20,13,4])).toBe(13);
    });
    });




});