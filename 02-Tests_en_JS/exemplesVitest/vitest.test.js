/**
 * @vitest-environment jsdom
 */

import { describe, expect, test, vi, beforeAll, afterAll, afterEach } from "vitest";
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import { arrays, numeric, objectes, promeses, promeses2, promeses3, server, serverPost, 
    callback, domDiv, domEventListener, domEventEmit, serverImage , spyFunctions} from "./index";

import * as sumModule from "./sum";


    
import { readFile } from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";


describe("Exemples Vitest", () => {
    describe("Numeric", () => {
        test("numeric ha de retornar un número", () => {
            expect(typeof numeric(1, 2)).toBe('number')
        });
        test("numeric ha de retornar la suma", () => {
            expect(numeric(1, 2)).toBe(3);
        });
        test("numeric espera dos argument", () => {
            expect(numeric()).toBe(NaN);
            expect(numeric(1)).toBe(NaN);
        });
        // Afegit en la segona iteració
        test("Si no passem números no funciona", () => {
            expect(numeric("a", "b")).toBe(NaN);
        });
    });
    describe("Arrays", () => {
        test("arrays ha de retornar un array", () => {
            expect(arrays([1, 2], [3, 4])).toBeInstanceOf(Array);
        });
        test("arrays ha de retornar un array concatenat", () => {
            expect(arrays([1, 2], [3, 4])).toEqual([1, 2, 3, 4]);
        });
        test("arrays ha de retornar un array que no siga cap dels que entren", () => {
            const a = [1, 2];
            const b = [3, 4];
            expect(arrays(a, b)).not.toBe(a);
            expect(arrays(a, b)).not.toBe(b);
        });
        // Afegir en la segona iteració
        test("arrays ha de funcionar amb menys parametres", () => {
            expect(arrays()).toEqual([]);
            expect(arrays([1])).toEqual([1]);
        });
        // Afegir en la tercera iteració
        test("arrays ha de funcionar amb parametres no arrays", () => {
            expect(arrays(1, 2)).toEqual([1, 2]);

        });
    });
    describe("Objectes", () => {
        test("objectes ha de retornar un objecte", () => {
            expect(typeof objectes({ a: 1 }, { b: 2 })).toBe('object');
        });
        test("objectes ha de retornar un objecte amb les propietats passades", () => {
            expect(objectes({ a: 1 }, { b: 2 })).toEqual({ a: { a: 1 }, b: { b: 2 } });
        });
        test('funciona amb strings', () => {
            expect(objectes('hola', 'mundo')).toEqual({ a: 'hola', b: 'mundo' });
        });
        test('funciona amb arrays', () => {
            expect(objectes([1, 2], [3, 4])).toEqual({ a: [1, 2], b: [3, 4] });
        });
        test('funciona amb menys dades', () => {
            expect(objectes({ a: 1 })).toEqual({ a: { a: 1 }, b: undefined });
            expect(objectes()).toEqual({ a: undefined, b: undefined }); // En realitat equal funciona sempre si és undefined
            // Probar si realment té a i b, encara que undefined:
            expect(objectes()).toMatchObject({
                a: undefined,
                b: undefined,
            });
            // una altra manera
            expect(objectes()).toHaveProperty('a');
            expect(objectes()).toHaveProperty('b');
        });

    });
    describe("Promeses", () => {
        test("promeses ha de retornar un array de promeses", () => {
            expect(promeses(1, 2)).toBeInstanceOf(Array);
            expect(promeses(1, 2)).toHaveLength(2);
            expect(promeses(1, 2).every(p => p instanceof Promise)).toBe(true);
        });
        test("una vegada resoltes han de retornar els valors", async () => {
            const result = promeses(1, 2);
            const values = await Promise.all(result);
            expect(values).toEqual([1, 2]);
            // una altra manera
            const resultAll = await Promise.all(promeses(1, 2));
            expect(resultAll).toEqual([1, 2]);
        });
    });
    describe("Promeses2", () => {
        test("promeses2 ha de retornar un array de promeses", () => {
            expect(promeses2(1, 2)).toBeInstanceOf(Array);
            expect(promeses2(1, 2)).toHaveLength(2);
            expect(promeses2(1, 2).every(p => p instanceof Promise)).toBe(true);
        });

        // Aquesta és una manera de testar promeses que de vegades no acaben, però no és neta perquè de vegades fallen:
        test("promeses ha de retornar els valors o res", async () => {
            const result = promeses2(1, 2);
            // expect(await result[0]).toBe(1);
            // expect(await result[1]).toBe(2);
            // Millor
            await expect(result[0]).resolves.toBe(1);
            await expect(result[1]).resolves.toBe(2);

        }, 100); // timeout

        // Aquest test està millor al crear una promesa "competidora"
        test("promeses ha de retornar els valors o res amb timeout", async () => {
            const result = promeses2(1, 2);
            const timeout = (ms) => new Promise((_, reject) => setTimeout(() => reject(new Error('Timeout exceeded')), ms));
            try { // Al fer el try catch vitest no dona error al detectar rejects
                const result1 = await Promise.race([result[0], timeout(500)]);
                const result2 = await Promise.race([result[1], timeout(500)]);
                expect(result1).toBe(1);
                expect(result2).toBe(2);
            }
            catch (error) {
                expect(error.message).toBe('Timeout exceeded');
            }
        });
        /*
        Dels dos test anteriors cal diferenciar el seu comportament. El primer és un test d'integració mal fet 
        al testar si funciona la promesa o no. Està mal fet perquè no és determinista. 
        El segon és un test unitari de la funció. Dona igual que falle la promesa. Si funciona espera un resultat i, 
        si no resol, no s'espera molt de temps i controla l'error. 
        El primer té un timeout a nivell de test, que provocarà un fallo de vitest. 

        A continuació una solució determinista controlant la font de aleatorietat de la funció:
        */
        test("promeses ha de retornar els valors o res Determinista", async () => {
            const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.9); // mock de la funció
            const result = promeses2(1, 2);
            await expect(result[0]).resolves.toBe(1);
            await expect(result[1]).resolves.toBe(2);
            randomSpy.mockRestore();
        });
        /* De totes formes, una funció que retorna una promesa que pot no acabar mai està mal feta per definició. 
        Per això promeses3 és una funció millor i més testable
        */

    });
    describe("Promeses3", () => {
        test("promeses2 ha de retornar un array de promeses", () => {
            const result = promeses3(1, 2).map(p => p.catch(() => { }));  // cal capturar els errors, que no ens interessen
            expect(result).toBeInstanceOf(Array);
            expect(result).toHaveLength(2);
            expect(result.every(p => p instanceof Promise)).toBe(true);
        });
        test("promeses ha de retornar els valors o res", async () => {
            const result = promeses3(1, 2);
            try {
                const result1 = await result[0];
                expect(result1).toBe(1);
            }
            catch (error) {
                expect(error.message).toBe('1'); // En aquest cas el capturem i el comprovem
            }
            try {
                const result2 = await result[1];
                expect(result2).toBe(2);
            }
            catch (error) {
                expect(error.message).toBe('2');
            }
        });
        test("promeses ha de retornar els valors o res Determinista", async () => {
            const randomSpy = vi.spyOn(Math, "random").mockReturnValue(0.9); // mock de la funció
            const result = promeses3(1, 2);
            await expect(result[0]).resolves.toBe(1);
            await expect(result[1]).resolves.toBe(2);
            randomSpy.mockRestore();
            const randomSpyReject = vi.spyOn(Math, "random").mockReturnValue(0.1); // mock de la funció
            const resultReject = promeses3(1, 2);
            await expect(resultReject[0]).rejects.toEqual(new Error('1'));
            await expect(resultReject[1]).rejects.toEqual(new Error('2'));
            randomSpyReject.mockRestore();
        });
    });


    // Configurar el servidor MSW para interceptar y mockear las solicitudes HTTP
    const mockServer = setupServer(
        http.get('http://dominiobueno.com/datos.json', () => {
            return HttpResponse.json({ a: 1, b: 2 }); // Mock de respuesta exitosa
        }),

        http.get('http://dominioquenoexiste.noexiste/datos.json', () => {
            return HttpResponse.error();
        }),
        http.get('http://dominiobueno.com/noexiste.json', () => {
            return new HttpResponse('Not found', {
                status: 404,
                headers: {
                    'Content-Type': 'text/plain',
                },
            })
        }),
        http.get('http://dominiobueno.com/jsonMalo.json', () => {
            return HttpResponse.text('json malo')
        }),

        http.post('http://dominiobueno.com/', async ({ request }) => {
            const newPost = await request.clone().json();
            return HttpResponse.json(newPost);
        }),
        http.get('http://dominiobueno.com/logo.png', async () => {
            // Tot açò és perquè s'executa en node i no en un servidor web
            const __dirname = path.dirname(fileURLToPath(import.meta.url));
            const buffer = await readFile(path.join(__dirname, "logo.png"));
            //console.log(buffer);
        
            return HttpResponse.arrayBuffer(buffer, {
                headers: {
                    "content-type": "image/png",
                },
            });
        }),
    );

    describe("Server", () => {
        beforeAll(() => mockServer.listen());
        afterAll(() => mockServer.close());
        afterEach(() => mockServer.resetHandlers());
        test("server ha de retornar un objecte", async () => {
            const result = await server("http://dominiobueno.com/datos.json");
            expect(typeof result).toBe('object');
            expect(result).toEqual({ a: 1, b: 2 });
        });
        test("server ha de retornar un error de red", async () => {
            try {
                const result = await server("http://dominioquenoexiste.noexiste/datos.json");
            } catch (error) {
                expect(error.message).toBe('Failed to fetch');
                expect(error.name).toBe('TypeError');
                expect(error).toBeInstanceOf(TypeError)
            }
        });
        // Segona iteració
        test("server ha de retornar un error de no trobat", async () => {
            try {
                const result = await server("http://dominiobueno.com/noexiste.json");
            } catch (error) {
                expect(error.message).toBe('Not Found');
                expect(error.name).toBe('Error');
                expect(error).toBeInstanceOf(Error)
            }
        });
        test("server ha de retornar un error de json malo", async () => {
            try {
                const result = await server("http://dominiobueno.com/jsonMalo.json");
            } catch (error) {
                expect(error.message).toContain('Unexpected token');
                expect(error.name).toBe('SyntaxError');
                expect(error).toBeInstanceOf(SyntaxError);

            }
        });
    });
    describe("ServerPost", () => {
        beforeAll(() => mockServer.listen());
        afterAll(() => mockServer.close());
        afterEach(() => mockServer.resetHandlers());

        test("serverPost ha de retornar un objecte", async () => {
            const result = await serverPost("http://dominiobueno.com/")({ a: 1, b: 2 });
            expect(typeof result).toBe('object');
            expect(result).toEqual({ a: 1, b: 2 });

        });
    });

    describe("ServerImage", () => {
        beforeAll(() => mockServer.listen());
        afterAll(() => mockServer.close());
        afterEach(() => mockServer.resetHandlers());

        test("serverImage ha de retornar un src de una imatge", async () => {
            const result = await serverImage("http://dominiobueno.com/logo.png");
            expect(result).contains("blob:");
            expect(result.startsWith("blob:")).toBe(true);
            // Faltaria testar errors
        });
    });

    describe("Callback", () => { 
        test("callback ha de retornar lo que retorne su función de callback", () => {
            const randomResult = Math.random();
            const callback = () => randomResult;
            expect(callback()).toBe(randomResult);
        });
        test("callback ha de llamar a la función de callback", () => {
            const callback = vi.fn(() => 42);
            const result = callback();
            expect(callback).toHaveBeenCalled();
            expect(result).toBe(42);
        });
    });

    describe("SpyFunctions", () => { 
        test("spyFunctions ha de retornar lo que calcula y el resultado de llamar al callback", () => {
            const data = [1,2,3,4,5,6];
            const callback = (max,min,suma) => ({min,max,suma});
            expect(spyFunctions(data,callback)).toEqual({min:1,max:6,suma:21});
        });
        test("callback ha de llamar a la función de callback", () => {
            const callback = vi.fn(() => ({min:1,max:6,suma:21}));
            const data = [1,2,3,4,5,6];
            const result = spyFunctions(data,callback);
            expect(callback).toHaveBeenCalled();
            expect(result).toEqual({min:1,max:6,suma:21});
        });
        test("callback ha de usar Math.max y Math.min", () => {
            const callback = vi.fn((max,min,suma) => ({min,max,suma}));
            const max = vi.spyOn(Math, "max");
            const min = vi.spyOn(Math, "min");
            const data = [1,2,3,4,5,6];
            const result = spyFunctions(data,callback);
            expect(max).toHaveBeenCalledWith(...data);
            expect(min).toHaveBeenCalledWith(...data);
            expect(result).toEqual({min:1,max:6,suma:21});
            max.mockRestore();
            min.mockRestore();
        });
        test("callback ha de usar sum", () => {
            const callback = vi.fn((max,min,suma) => ({min,max,suma}));
            const sum = vi.spyOn(sumModule, "sum");  
            // sols pots espiar funcions importades tant pel mòdul com pel test
            // Per importar al test, cal fer-ho sempre amb "import * as ...""
            const result = spyFunctions([1,2,3,4,5,6],callback);
            expect(sum).toHaveBeenCalled();

        });
   
    });

    describe("DOM", () => { 
        test("domDiv ha de retornar un div", () => {
            const result = domDiv("<div>Hola</div>");
            expect(result).toBeInstanceOf(HTMLDivElement);
            expect(result.innerHTML).toBe("<div>Hola</div>");
        });
         test("domDiv ha de retornar un div amb innerHTML", () => {
            const result = domDiv("<h1>Hola</h1>");
            const h1 = result.querySelector("h1");
            expect(h1).toBeInstanceOf(HTMLHeadingElement);

            expect(h1.innerHTML).toBe("Hola");
        });

    });

    describe("DOMEventListener", () => {
        test("DOMEventListener ha d'afegir un eventListener", () => {
            const div = domDiv("<div>Hola</div>"); // aquest tests ja no és totalment unitari
            const handler = vi.fn();
            const removeListener = domEventListener(div)(handler);
            div.dispatchEvent(new MouseEvent("click"));
            expect(handler).toHaveBeenCalled();
            expect(removeListener).toBeInstanceOf(Function);
            removeListener();
        });
     });
    describe("DOMEventEmit", () => {
        test("DOMEventEmit ha d'emitir un event",()=>{
            const div = domDiv("<div>Hola</div>");
            const details = {a: 1, b: 2};    
            div.addEventListener("click", (event) => {
                expect(event.detail).toEqual(details);
            });
            div.addEventListener("mouseover", (event) => {
                expect(event.detail).toEqual(details);
            });
            domEventEmit(div)("click")(details);
            domEventEmit(div)("mouseover")(details);
        
        });
     });
});

