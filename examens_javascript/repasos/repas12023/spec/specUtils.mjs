import * as Utils from "../src/utils.js";

describe("Utils", function () {
    describe("UtiliArray Utils", function () {
        it("createArray should create an array with a generator", function () {
            let arrayCreated = Utils.createArray(10,(array,index)=> array.length*index);
            expect(arrayCreated.length).toBe(10);
            expect(arrayCreated).toEqual([0,10,20,30,40,50,60,70,80,90]);
        });
        it("unFlat should create a 2 dimension array", function () {
            let arrayBase = [1,2,3,4,5,6];
            expect(Utils.unFlat(arrayBase,3)).toEqual([[1,2,3],[4,5,6]]);
            expect(Utils.unFlat(arrayBase,2)).toEqual([[1,2],[3,4],[5,6]]);
            arrayBase = [1,2,3,4,5,6,7];
            expect(Utils.unFlat(arrayBase,3)).toEqual([[1,2,3],[4,5,6],[7]]);
            expect(Utils.unFlat(arrayBase,2)).toEqual([[1,2],[3,4],[5,6],[7]]);
            expect(arrayBase).toEqual([1,2,3,4,5,6,7]); // immutable
        });
        it("uniqueValues should remove repetated in an array", function () {
            let arrayRepeated = [1,1,2,2,3,4,5,6,7,7,1,2];
            let arrayUnique = Utils.uniqueValues(arrayRepeated);
            expect(arrayUnique).toEqual([1,2,3,4,5,6,7]);
            expect(arrayRepeated).toEqual([1,1,2,2,3,4,5,6,7,7,1,2]);  // immutable
        });
        it("cartesianProduct do all the combinations between two arrays", function () {
            let array1 = [1,2,3];
            let array2 = ['a','b','c'];
            let expectedResult = [[1,'a'],[1,'b'],[1,'c'],[2,'a'],[2,'b'],[2,'c'],[3,'a'],[3,'b'],[3,'c']];
            expect(Utils.cartesianProduct(array1,array2)).toEqual(expectedResult);
            expect(array1).toEqual([1,2,3]);  //immutable
            expect(array2).toEqual(['a','b','c']);
        });
        it("innerJoin do a innerJoin", function () {
            let people = [{id: 1, name: 'Fulano'},{id: 2, name: 'Mengano'},{id: 3, name: 'Sotano'}];
            let cars = [{id: '0000JKL', owner: 1},{id: '1111JKL', owner: 1},{id: '2222JKL', owner: 2},{id: '3333JKL', owner: 4}];
            let expectedResult = [
                [{id: '0000JKL', owner: 1},{id: 1, name: 'Fulano'}],
                [{id: '1111JKL', owner: 1},{id: 1, name: 'Fulano'}],
                [{id: '2222JKL', owner: 2},{id: 2, name: 'Mengano'}]
            ];
            expect(Utils.innerJoin(cars,people, (a,b) => a.owner === b.id)).toEqual(expectedResult);
            expect(people).toEqual( [{id: 1, name: 'Fulano'},{id: 2, name: 'Mengano'},{id: 3, name: 'Sotano'}]);  //immutable
            expect(cars).toEqual([{id: '0000JKL', owner: 1},{id: '1111JKL', owner: 1},{id: '2222JKL', owner: 2},{id: '3333JKL', owner: 4}]);
        });
        it("LeftJoin do a LeftJoin", function () {
            let people = [{id: 1, name: 'Fulano'},{id: 2, name: 'Mengano'},{id: 3, name: 'Sotano'}];
            let cars = [{id: '0000JKL', owner: 1},{id: '1111JKL', owner: 1},{id: '2222JKL', owner: 2},{id: '3333JKL', owner: 4}];
            let expectedResult = [
                [{id: '0000JKL', owner: 1},{id: 1, name: 'Fulano'}],
                [{id: '1111JKL', owner: 1},{id: 1, name: 'Fulano'}],
                [{id: '2222JKL', owner: 2},{id: 2, name: 'Mengano'}],
                [{id: '3333JKL', owner: 4},null]
            ];
            expect(Utils.innerJoin(cars,people,(a,b) => a.owner === b.id)).toEqual(expectedResult);
            expect(people).toEqual( [{id: 1, name: 'Fulano'},{id: 2, name: 'Mengano'},{id: 3, name: 'Sotano'}]);  //immutable
            expect(cars).toEqual([{id: '0000JKL', owner: 1},{id: '1111JKL', owner: 1},{id: '2222JKL', owner: 2},{id: '3333JKL', owner: 4}]);
        });
    });
});