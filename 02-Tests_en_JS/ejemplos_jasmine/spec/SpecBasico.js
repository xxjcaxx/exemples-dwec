describe("Javascript Basico", function () {
    describe("Arrays", function () {
        it("Ejercicio 1: Debe devolver un array con tantos 0 como se indique por parámetros", function () {
            expect(ejercicio1(3)).toEqual([0, 0, 0]);
        });
        it("Ejercicio 1 (2): Debe devolver un array con tantos 0 como se indique por parámetros", function () {
            expect(ejercicio1(5)).toEqual([0, 0, 0, 0, 0]);
        });

        it("Ejercicio 2: Debe indicar si una string está en un array", function () {
            expect(ejercicio2(["a", "b", "c"], "a")).toBe(true);
            expect(ejercicio2(["a", "b", "c"], "d")).toBe(false);
        });
        it("Ejercicio 3: Debe devolver el primer elemento par de un array", function () {
            expect(ejercicio3([1, 2, 3, 4])).toBe(2);
        });
        it("Ejercicio 4: Debe devolver el primer elemento primo de un array", function () {
            expect(ejercicio4([10, 20, 13, 4])).toBe(13);
        });
        it("Ejercicio 5: Haz una función que retorne todos los números impares de un array", function () {
            expect(ejercicio5([10, 20, 13, 15, 4])).toEqual([13, 15]);
        });
        it("Ejercicio 6: Haz una función que ordene alfabeticamente las letras de un string", function () {
            expect(ejercicio6("hola")).toEqual("ahlo");
        });
    });

    describe("Objetos", function () {
        it("Ejercicio 7: Haz una función que acepte nombre y dos apellidos y retorne un objeto con esos datos", function () {
            expect(ejercicio7('Antonio', 'Alcantara', 'Barbadillo')).toEqual({ nombre: 'Antonio', apellido1: 'Alcantara', Apellido2: 'Barbadillo' });
        });
        it("Ejercicio 8: Haz una función que acepte un objeto y retorne un array con los atributos sin las claves", function () {
            expect(ejercicio8({ a: 1, b: 2, c: 3 })).toEqual([1, 2, 3]);
        });
        it("Ejercicio 9: Haz una función constructora de objetos que acepte el nombre y los dos apellidos", function () {
            expect(new Persona('Antonio', 'Alcantara', 'Barbadillo')).toEqual({ nombre: 'Antonio', apellido1: 'Alcantara', Apellido2: 'Barbadillo' });
        });


    });




});