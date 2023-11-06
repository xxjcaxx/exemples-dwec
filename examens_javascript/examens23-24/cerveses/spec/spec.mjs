import * as Cerveses from "../src/cerveses.js";
import { beers } from "../src/beers.js";

describe('Beers', function () {
    describe('Generation', function () {
        it('generateDivsBeers should return a div array', function () {
            let divsArray = Cerveses.generateDivsBeers(beers)
            expect(divsArray).toBeInstanceOf(Array);
            expect(divsArray.length).toBe(beers.length);
            expect(divsArray[0]).toBeInstanceOf(Element);
        });
        it('addDivs shoul add divs', function () {
            let container = document.createElement('div');
            Cerveses.addDivs(container, Cerveses.generateDivsBeers(beers));
            expect(container.children.length).toBe(beers.length);
        });
        it('SortBy should sort by', function () {
            let testArray = [1, 2, 3, 4];
            let result = Cerveses.sortBy((a, b) => a > b ? -1 : 1, testArray);
            expect(result).toEqual([4, 3, 2, 1]);
            expect(testArray).toEqual([1, 2, 3, 4]);
        });
        it('compareBeers should compare beers', function () {
            let testArray = [
                {
                    abv: 4.5,
                    ibu: 60,
                    target_fg: 1010,
                    target_og: 1044,
                    ebc: 20,
                    srm: 10,
                    ph: 4.4,
                }, {
                    abv: 4.1,
                    ibu: 41.5,
                    target_fg: 1010,
                    target_og: 1041.7,
                    ebc: 15,
                    srm: 15,
                    ph: 4.4,
                }
            ];
            expect(Cerveses.compareBeers(testArray[0],testArray[1])).toBe(23.9);
        });
        it('findSimilarBeers should return 25 similar beers', function () {
            let result = Cerveses.findSimilarBeers(beers[0],beers);
            expect(result.length).toBe(25);
            expect(result[0].abv).toEqual(jasmine.any(Number));
        });


    });
});
