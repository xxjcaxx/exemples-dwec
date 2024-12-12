/**
 * @vitest-environment jsdom
 */

import { describe, expect, test, beforeAll, afterEach, afterAll, vi, beforeEach } from "vitest";
import { getSupabase } from "../src/services/supaservice";
import { http, HttpResponse } from "msw";
import { setupServer } from "msw/node";
import { playersExemple } from "./playersExample";
import { compose, sumStats, cleanData, extractDataToArray, colorArray } from "../src/functionals";
//import { appendDivs, createCustomElement, createDivs, getAndAppend } from "../src/dom";
import * as dom from "../src/dom";

const server = setupServer(
  http.get("*", (req, res, ctx) => {
    const url = new URL(req.request.url);
    console.log(req.request.url);
    const lastPathSegment = url.pathname.split("/").filter(Boolean).pop();
    if (lastPathSegment === "players") {
      return HttpResponse.json(playersExemple);
    }

    return  HttpResponse.json(
      {
        code: "42P01",
        details: null,
        hint: null,
        message: `relation "public.exemple" does not exist`,
      },
      {
        status: 404,
      }
    );
  })
);

beforeAll(() => server.listen({ onUnhandledRequest: "warn" }));
afterEach(() => server.resetHandlers());
afterAll(() => server.close());


describe("Supabase", function () {
  describe("Get Tables", function () {
    test("Deu retornar una promesa", async function () {
      expect(getSupabase("*","exemple")(null)).toBeInstanceOf(Promise);
    });
    test("Deu retornar un Objecte", async function () {
      expect(await getSupabase("*","exemple")(null)).toBeInstanceOf(Object);
    });
    test("Deu retornar els players", async function () {
      expect(await getSupabase("*","players")(null)).toEqual(playersExemple);
    });
  });
});

describe("Functionals", function () {
describe('compose', () => {
  test('should compose functions and process them from right to left', async () => {
    const addOne = x => x + 1;
    const double = x => x * 2;
    const composed = compose(addOne, double); // addOne(double(x))
    const result = composed(3);
    expect(await result).toBe(7); // double(3) -> 6; addOne(6) -> 7
  });

  test('should handle async functions correctly', async () => {
    const asyncAddOne = async x => x + 1;
    const double = x => x * 2;
    const composed = compose(asyncAddOne, double); // asyncAddOne(double(x))
    const result = composed(3);
    expect(await result).toBe(7); // double(3) -> 6; asyncAddOne(6) -> 7
  });

  test('should handle multiple async functions correctly', async () => {
    const asyncAddOne = async x => x + 1;
    const asyncDouble = async x => x * 2;
    const composed = compose(asyncAddOne, asyncDouble); // asyncAddOne(asyncDouble(x))
    const result = composed(3);
    expect(await result).toBe(7); // asyncDouble(3) -> 6; asyncAddOne(6) -> 7
  });

  test('should return the initial value when no functions are provided', async () => {
    const composed = compose(); // No functions
    const result = composed(3);
    expect(await result).toBe(3); // Should return the input value
  });

  test('should work with a single function', async () => {
    const addOne = x => x + 1;
    const composed = compose(addOne); // Only one function
    const result = composed(3);
    expect(await result).toBe(4); // addOne(3) -> 4
  });
});

describe('sumStats', () => {
  test('should sum the values of matching keys in two objects', () => {
    const stats1 = { a: 1, b: 2, c: 3 };
    const stats2 = { a: 4, b: 5, c: 6 };
    const result = sumStats(stats1, stats2);
    expect(result).toEqual({ a: 5, b: 7, c: 9 });
  });

  test('should handle zero values correctly', () => {
    const stats1 = { a: 0, b: 2, c: 0 };
    const stats2 = { a: 3, b: 0, c: 6 };
    const result = sumStats(stats1, stats2);
    expect(result).toEqual({ a: 3, b: 2, c: 6 });
  });

  test('should return an empty object when both inputs are empty', () => {
    const stats1 = {};
    const stats2 = {};
    const result = sumStats(stats1, stats2);
    expect(result).toEqual({});
  });

  test('should work when stats1 and stats2 have matching keys with negative values', () => {
    const stats1 = { a: -1, b: -2, c: -3 };
    const stats2 = { a: -4, b: -5, c: -6 };
    const result = sumStats(stats1, stats2);
    expect(result).toEqual({ a: -5, b: -7, c: -9 });
  });
});

describe('cleanData', () => {
  test('should convert all values to integers', () => {
    const input = { a: '1', b: '2', c: '3' };
    const result = cleanData(input);
    expect(result).toEqual({ a: 1, b: 2, c: 3 });
  });

  test('should handle null and undefined values by converting them to 0', () => {
    const input = { a: null, b: undefined, c: '5' };
    const result = cleanData(input);
    expect(result).toEqual({ a: 0, b: 0, c: 5 });
  });

  test('should convert empty strings to 0', () => {
    const input = { a: '', b: '0', c: '3' };
    const result = cleanData(input);
    expect(result).toEqual({ a: 0, b: 0, c: 3 });
  });

  test('should work with negative numbers in string form', () => {
    const input = { a: '-10', b: '-20', c: '30' };
    const result = cleanData(input);
    expect(result).toEqual({ a: -10, b: -20, c: 30 });
  });

  test('should return an empty object if input is an empty object', () => {
    const input = {};
    const result = cleanData(input);
    expect(result).toEqual({});
  });
});


describe('extractDataToArray', () => {
  test('should extract specified properties and return them as an array', () => {
    const input = {
      head: 5,
      left_foot: 3,
      right_foot: 4,
      inside_area: 8,
      outside_area: 2,
      penalties_scored: 1,
    };
    const result = extractDataToArray(input);
    expect(result).toEqual([5, 3, 4, 8, 2, 1]);
  });

  test('should return undefined for missing properties in the input object', () => {
    const input = {
      head: 5,
      left_foot: 3,
    }; // Missing other properties
    const result = extractDataToArray(input);
    expect(result).toEqual([5, 3, undefined, undefined, undefined, undefined]);
  });

  test('should handle all properties as undefined if the input is an empty object', () => {
    const input = {};
    const result = extractDataToArray(input);
    expect(result).toEqual([undefined, undefined, undefined, undefined, undefined, undefined]);
  });

  test('should correctly handle properties with null values', () => {
    const input = {
      head: null,
      left_foot: 3,
      right_foot: null,
      inside_area: 8,
      outside_area: null,
      penalties_scored: 1,
    };
    const result = extractDataToArray(input);
    expect(result).toEqual([null, 3, null, 8, null, 1]);
  });

  test('should handle properties with a mix of valid numbers and strings', () => {
    const input = {
      head: '5',
      left_foot: 3,
      right_foot: '4',
      inside_area: 8,
      outside_area: '2',
      penalties_scored: 1,
    };
    const result = extractDataToArray(input);
    expect(result).toEqual(['5', 3, '4', 8, '2', 1]);
  });
});

describe('colorArray', () => {
  test('should return the correct color for a valid index', () => {
    expect(colorArray(0)).toBe('#FF6633'); // First color in the array
    expect(colorArray(10)).toBe('#80B300'); // 11th color in the array
    expect(colorArray(49)).toBe('#6666FF'); // Last color in the array
  });

  test('should return the same color for equivalent indices due to the .at() method', () => {
    expect(colorArray(0)).toBe('#FF6633'); // Index 0
    expect(colorArray(-50)).toBe('#FF6633'); // -50 loops to the first element
  });
});

});


describe("DOM", function () {
  


  describe('appendDivs', () => {
    test('should clear the container and append the given divs', () => {
      // Setup a mock container
      const container = document.createElement('div');
      container.innerHTML = '<p>Old Content</p>';
  
      // Create some mock div elements
      const div1 = document.createElement('div');
      div1.textContent = 'Div 1';
      const div2 = document.createElement('div');
      div2.textContent = 'Div 2';
  
      // Call the function
      const appendToContainer = dom.appendDivs(container);
      appendToContainer([div1, div2]);
  
      // Verify the results
      expect(container.innerHTML).toBe('<div>Div 1</div><div>Div 2</div>');
      expect(container.childElementCount).toBe(2);
      expect(container.children[0]).toBe(div1);
      expect(container.children[1]).toBe(div2);
    });
  
    test('should handle an empty array of divs', () => {
      const container = document.createElement('div');
      container.innerHTML = '<p>Old Content</p>';
  
      const appendToContainer = dom.appendDivs(container);
      appendToContainer([]);
  
      expect(container.innerHTML).toBe('');
      expect(container.childElementCount).toBe(0);
    });
  
    test('should replace the content of the container each time it is called', () => {
      const container = document.createElement('div');
  
      const div1 = document.createElement('div');
      div1.textContent = 'Div 1';
      const div2 = document.createElement('div');
      div2.textContent = 'Div 2';
  
      const div3 = document.createElement('div');
      div3.textContent = 'Div 3';
  
      const appendToContainer = dom.appendDivs(container);
  
      // First append call
      appendToContainer([div1, div2]);
      expect(container.innerHTML).toBe('<div>Div 1</div><div>Div 2</div>');
  
      // Second append call
      appendToContainer([div3]);
      expect(container.innerHTML).toBe('<div>Div 3</div>');
    });
  
    test('should not throw if container is empty initially', () => {
      const container = document.createElement('div');
      const div = document.createElement('div');
      div.textContent = 'New Div';
  
      const appendToContainer = dom.appendDivs(container);
      expect(() => appendToContainer([div])).not.toThrow();
  
      expect(container.innerHTML).toBe('<div>New Div</div>');
    });
  });


  describe('createCustomElement', () => {
    test('should create an element with the specified tag', () => {
      const createDiv = dom.createCustomElement('div');
      const element = createDiv();
  
      expect(element.tagName.toLowerCase()).toBe('div');
   
    });
  
    test('should assign the provided data to the element\'s data property', () => {
      const createDiv = dom.createCustomElement('div');
      const data = { key: 'value' };
      const element = createDiv(data);
  
      expect(element.data).toBe(data);
   
    });
  
    test('should handle different HTML tags', () => {
      const createSpan = dom.createCustomElement('span');
      const createButton = dom.createCustomElement('button');
      const spanElement = createSpan();
      const buttonElement = createButton();
  
      expect(spanElement.tagName.toLowerCase()).toBe('span');
      expect(buttonElement.tagName.toLowerCase()).toBe('button');
     
    });
  
    test('should handle null or undefined data', () => {
      const createDiv = dom.createCustomElement('div');
  
      const nullElement = createDiv(null);
      expect(nullElement.data).toBeNull();
  
      const undefinedElement = createDiv(undefined);
      expect(undefinedElement.data).toBeUndefined();
     
    });
  
    test('should create a unique element each time it is called', () => {
      const createDiv = dom.createCustomElement('div');
      const data1 = { key: 'value1' };
      const data2 = { key: 'value2' };
  
      const element1 = createDiv(data1);
      const element2 = createDiv(data2);
  
      expect(element1).not.toBe(element2); // Different instances
      expect(element1.data).toBe(data1);
      expect(element2.data).toBe(data2);

    });
    
  });
  

  
  describe('createDivs', () => {
  
    test('should create an array of elements using the specified tag and data', () => {     
      const data = [{ key: 'value1' }, { key: 'value2' }];
      const divs = dom.createDivs('div')(data);
      //const divs = createDivsFromData(data);
      expect(divs.length).toBe(2);
      expect(divs[0].tagName.toLowerCase()).toBe('div');
      expect(divs[0].data).toEqual({ key: 'value1' });
      expect(divs[1].tagName.toLowerCase()).toBe('div');
      expect(divs[1].data).toEqual({ key: 'value2' });

    });
  
    test('should return an empty array if data is empty', () => {
      const createDivsFromData = dom.createDivs('div');
      const divs = createDivsFromData([]);
      expect(divs).toEqual([]);

    });
  
    test('should call createCustomElement for each item in the data array', () => {
      const data = [{ key: 'value1' }, { key: 'value2' }];
      const divs = dom.createDivs('div')(data);
    });
  
    test('should handle various tags correctly', () => {
     
      const data = [{ key: 'value1' }, { key: 'value2' }];
      const spans = dom.createDivs('span')(data);
  
      expect(spans[0].tagName.toLowerCase()).toBe('span');
      expect(spans[1].tagName.toLowerCase()).toBe('span');

    });
 
  });
  
  
  

});

