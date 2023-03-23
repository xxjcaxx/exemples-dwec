import {getArrayTable} from "../../components/tables.js"
import { ぁ } from "../../utils.js";


describe("Tables", function () {
    describe("Tables Data", function () {
        it("Debe convertir un array de objetos en un array de array, com un csv", function () {
            expect(getArrayTable([{a:1,b:2},{a:1,c:3}])).toEqual([['a','b','c'],[1,2,null],[1,null,3]]);
        });
      
    });

  


});

describe("Utils", function () {
    describe("Objects Utils", function () {
        it("Debe eliminar atributos en objetosde un array", function () {
            expect( ぁ.removeAttributes([{a:1,b:2},{a:1,c:3}])(['a'])).toEqual([{b:2},{c:3}]);
        });
      
    });

  


});