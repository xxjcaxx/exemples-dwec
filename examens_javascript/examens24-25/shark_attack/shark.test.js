/**
 * @vitest-environment jsdom
 */

import { describe, expect, test } from "vitest";

import * as shark from "./main";

import records from "./records.json";

const peticio = { dateFrom: "2022-05-13", dateTo: "2023-05-13", limit: 30, offset: 20 }
const peticio2 = { dateFrom: "2023-05-13", dateTo: "2024-05-13", limit: 10, offset: 10 }

describe("Examen de Javascript", function () {
    describe("Exercici 1: getSharkAttackQuery", function () {
        const peticioULR = shark.getSharkAttackQuery(peticio);
        const peticio2ULR = shark.getSharkAttackQuery(peticio2);
        test("Deu retornar una string", function () {
            expect(typeof peticioULR === 'string').toBe(true);
            expect(typeof peticio2ULR === 'string').toBe(true);
        });
        test("Deu retornar una petició válida", function () {
            const url = new URL(`https://test.test${peticioULR}`);
            expect(new URLSearchParams(url.search).get('where')).toBe('date > "2022-05-13" and date < "2023-05-13"');
            expect(new URLSearchParams(url.search).get('limit')).toBe("30");
            expect(new URLSearchParams(url.search).get('offset')).toBe("20");
        });
    });

    describe("Exercici 2: getSharkAttackData", function () {
        const peticioULR = `/api/explore/v2.1/catalog/datasets/global-shark-attack/records?where=date+%3E+%222022-05-13%22+and+date+%3C+%222023-05-13%22&limit=30&offset=20`;
        const promesa = shark.getSharkAttackData(peticioULR);
        test("Deu retornar una promesa", function () {
            expect(promesa).toBeInstanceOf(Promise);
        });
        test("Deu retornar les dades", async function () {
            const dades = await promesa;
            expect(dades).toBeInstanceOf(Object);
            expect(dades).toHaveProperty('results')
        });
        const peticioMala = '/api/explore/v2.1/catalog/datasets/global-shark-attack/recods';
        test("Deu retornar l'objecte mínim si falla la petició", async function () {
            const dades = await shark.getSharkAttackData(peticioMala);
            expect(dades).toBeInstanceOf(Object);
            expect(dades).toHaveProperty('results');
            expect(dades).toEqual({results:[]});
        });
    });

    describe("Exercici 3: getYearsFromData", function () {
        const years = shark.getYearsFromData(records);
        test("Deu retornar un array", function () {
            expect(years).toBeInstanceOf(Array);
        });
        test("Deu retornar els anys", async function () {
            expect(years[0]).toBe("2022");
            expect(years.length).toBe(2);
        });
    });

    describe("Exercici 4: generateYearsButtons", function () {
        const buttons = shark.generateYearsButtons(["2022", "2023"]);
        test("Deu retornar un array", function () {
            expect(buttons).toBeInstanceOf(Array);
        });
        test("Deu retornar un array de buttons", function () {
            expect(buttons.every(b => b instanceof Element)).toBe(true);
            expect(buttons.every(b => b.tagName == 'BUTTON')).toBe(true);
        });
        test("Cada button té el seu any en dataset ", function () {
            expect(buttons.every(b => b.dataset.year === b.innerText)).toBe(true);
            expect(buttons[0].dataset.year).toBe("2022");
            expect(buttons[1].dataset.year).toBe("2023");
        });
    });

    describe("Exercici 5: generateTable", function () {
        const table = shark.generateTable(records);
        const cols = ["date", "year", "type", "country", "area", "location", "activity", "name", "sex", "age", "injury", "fatal_y_n", "time", "species", "investigator_or_source", "pdf", "href_formula", "href", "case_number", "case_number0", "original_order"];
        test("Deu retornar un Element", function () {
            expect(table).toBeInstanceOf(Element);
        });
        test("Deu retornar una taula", function () {
            expect(table.tagName == 'TABLE').toBe(true);
        });
        test("La taula tindrà les dades esperades", function () {
            expect(table.childElementCount).toBe(21);
            expect([...table.querySelectorAll('th')].map(th => th.innerHTML)).toEqual(cols);
            table.querySelectorAll('tr')
        });
    });

    describe("Exercici 6: generateStatistics", function () {
        const stats = shark.generateStatistics(records);
        
        const result = {};
        test("Deu retornar un Objecte", function () {
            expect(stats).toBeInstanceOf(Object);
        });
        test("Deu retornar un estat amb una estructura determinada", function () {
            expect(stats).toEqual({
                worstMonthOfYear: expect.any(Number),  // pitjor mes de l'any en quantitat d'atacs
                worstArea: expect.any(String),      // Pitjor area en quantitat d'atacs
                PercentOfUnprovokedAttacks: expect.any(Number),   // % d'atacs provocats front a altres
                percentOfMales: expect.any(Number),               // % de sexe masculí 
                percentOfFatals: expect.any(Number),          // % d'atacs fatals
                ages: expect.objectContaining({
                    "0-10": expect.any(Number),    // % d'edat entre 0 i 10
                    "11-20": expect.any(Number),
                    "21-30": expect.any(Number),
                    "31-40": expect.any(Number),
                    "41-50": expect.any(Number),
                    "51-60": expect.any(Number),
                    ">60": expect.any(Number),
                })
            });
        });
        test("L'Objecte tindrà les dades esperades", function () {
          expect(stats).toEqual({
            worstMonthOfYear: 5,
            worstArea: 'Florida',
            PercentOfUnprovokedAttacks: 80,
            percentOfMales: 90,
            percentOfFatals: 10,
            ages: {
              '0-10': 10,
              '11-20': 15,
              '21-30': 0,
              '31-40': 5,
              '41-50': 5,
              '51-60': 15,
              '>60': 10
            }
          })
        });
    });
});
