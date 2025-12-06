/**
 * @vitest-environment jsdom
 */

import { describe, expect, test, vi, beforeAll, afterAll, afterEach, beforeEach } from "vitest";
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';

import * as supaservice from "../src/services/supaservice.js";
import * as buscador from "../src/components/buscador/buscador.js";
import { Subject, firstValueFrom } from "rxjs";

const mockOfertas = [
    { "Título": "Desarrollador Frontend", "Ubicación": "Madrid", "Salario Mínimo": 30000, "Salario Máximo": 45000, "Jornada": "Completa", "Tipo contrato": "Indefinido", "Funciones": "Desarrollo web", "Experiencia": "2 años", "Enlace": "http://example.com/oferta1" },
    { "Título": "Desarrollador Backend", "Ubicación": "Barcelona", "Salario Mínimo": 35000, "Salario Máximo": 50000, "Jornada": "Completa", "Tipo contrato": "Indefinido", "Funciones": "Desarrollo backend", "Experiencia": "3 años", "Enlace": "http://example.com/oferta2" }
];

let query;

const mockServer = setupServer(
    http.get('https://zjwnfbhnemehixhiupey.supabase.co/rest/v1/ofertas*', ({ request }) => {
        const url = new URL(request.url);
        query = url.searchParams.toString();

        return HttpResponse.json(mockOfertas); // Mock de respuesta exitosa
    }),
    http.get('https://zjwnfbhnemehixhiupey.supabase.co/rest/v1/jornadas*', ({ request }) => {
        return HttpResponse.json([
            { id: '1', jornadas: 'mook1' },
            { id: '2', jornadas: 'mook2' }
        ]); // Mock de respuesta exitosa
    }
    )

);


beforeAll(() => mockServer.listen());
afterAll(() => mockServer.close());
afterEach(() => mockServer.resetHandlers());
beforeEach(() => {
    supaservice.ofertasSubject.subscribe(() => { }); // evitar errores de suscripción no manejada
});

describe("Supabase Service", () => {
    test("getOfertas pide y devuelve ofertas", async () => {

        const ofertasPromise = supaservice.getOfertas(null);
        expect(ofertasPromise).toBeInstanceOf(Promise);
        await ofertasPromise;
        expect(supaservice.ofertasSubject).toBeInstanceOf(Subject);
        supaservice.ofertasSubject.subscribe((o) => {
            expect(o).toEqual(mockOfertas);
        });

    });

    test("getOfertas utiliza el query recibido", async () => {

        const query = new URLSearchParams([
            ['Descripción', 'ilike.*Desarrollador*'],
            ['Jornada', 'eq.Completa']
        ]).toString();

        const ofertasPromise = supaservice.getOfertas(query);
        await ofertasPromise;
        expect(query).toBeDefined();
        expect(query).toContain('Descripci%C3%B3n=ilike.*Desarrollador*&Jornada=eq.Completa');
        expect(query).toContain('Jornada=eq.Completa');
    });

    test("getJornadas pide y devuelve jornadas", async () => {
        const jornadas = await supaservice.getJornadas();
        expect(jornadas).toBeInstanceOf(Array);
        expect(jornadas.length).toBe(2);
        expect(jornadas[0]).toEqual({ id: '1', jornadas: 'mook1' });
    });


});

describe("TecnoBuscador Component", () => {
    test("insertJornadas inserta opciones en el select de jornadas", () => {
        document.body.innerHTML = `<tecno-buscador></tecno-buscador>`;
        const buscadorElement = document.querySelector("tecno-buscador");
        const jornadas = [
            { id: '1', jornadas: 'mook1' },
            { id: '2', jornadas: 'mook2' }
        ];
        buscadorElement.insertJornadas(jornadas);
        const select = buscadorElement.querySelector('#select-jornada');
        expect(select.children.length).toBe(2);
        expect(select.children[0].value).toBe('1');
        expect(select.children[0].textContent).toBe('mook1');
    });
    test("insertTiposContrato inserta opciones en el select de tipos de contrato", () => {
        document.body.innerHTML = `<tecno-buscador></tecno-buscador>`;
        const buscadorElement = document.querySelector("tecno-buscador");
        const tiposContrato = [
            { id: '1', tipo: 'Indefinido' },
            { id: '2', tipo: 'Temporal' }
        ];
        buscadorElement.insertTiposContrato(tiposContrato);
        const select = buscadorElement.querySelector('#select-tipo-contrato');
        expect(select.children.length).toBe(2);
        expect(select.children[0].value).toBe('1');
        expect(select.children[0].textContent).toBe('Indefinido');
    });

    test("insertFunciones inserta opciones en el select de funciones", () => {
        document.body.innerHTML = `<tecno-buscador></tecno-buscador>`;
        const buscadorElement = document.querySelector("tecno-buscador");
        const funciones = [
            { id: '1', funcion: 'Desarrollo web' },
            { id: '2', funcion: 'Diseño UX' }
        ];
        buscadorElement.insertFunciones(funciones);
        const select = buscadorElement.querySelector('#select-funciones');
        expect(select.children.length).toBe(2);
        expect(select.children[0].value).toBe('1');
        expect(select.children[0].textContent).toBe('Desarrollo web');
    });

    test("handleChange genera filtros correctos desde el formulario", () => {
        document.body.innerHTML = `<form id="buscador-form">
        <input id="buscador-input" type="text" name="description" value="Desarrollador">
        <select id="select-jornada" name="jornada">
          <option value="">--Seleccione--</option>
          <option value="1" selected>Completa</option>
          <option value="2">Parcial</option>
        </select>
        <select id="select-tipo-contrato" name="tipo-contrato">
          <option value="">--Seleccione--</option>
          <option value="1" selected>Indefinido</option>
          <option value="2">Temporal</option>
        </select>
        <select id="select-funciones" name="funciones">
          <option value="">--Seleccione--</option>
          <option value="1" selected>Desarrollo web</option>
          <option value="2">Diseño UX</option>
        </select>
        <input id="salario-minimo" type="range" name="salario-minimo" min="0" max="100000" step="100" value="30000">
      </form>`;

        const form = document.getElementById('buscador-form');
        const filters = buscador.handleChange(form)(new Event('change'));
        expect(filters).toBeInstanceOf(URLSearchParams);
        expect(filters.toString()).toBe("Descripci%C3%B3n=ilike.*Desarrollador*&Jornada=eq.1&Tipo+contrato=eq.1&Funciones=eq.1&%22Salario+M%C3%ADnimo%22%3A%3Aint=gte.30000")
        expect([...filters.entries()]).toEqual([
            [
                "Descripción",
                "ilike.*Desarrollador*",
            ],
            [
                "Jornada",
                "eq.1",
            ],
            [
                "Tipo contrato",
                "eq.1",
            ],
            [
                "Funciones",
                "eq.1",
            ],
            [
                "\"Salario Mínimo\"::int",
                "gte.30000",
            ],
        ]);
    });
      test("El filterSubject se actualiza cuando hay un evento change", async () => {
        document.body.innerHTML = `<tecno-buscador></tecno-buscador>`;
        const buscadorElement = document.querySelector("tecno-buscador");
        const form = buscadorElement.querySelector('#buscador-form');
        const event = new Event('change');
        
        expect(buscadorElement.filtersSubject).toBeInstanceOf(Subject);
        const spy = vi.spyOn(buscadorElement.filtersSubject, 'next');
        const promise = firstValueFrom(buscadorElement.filtersSubject);
        form.dispatchEvent(event);

        const filters = await promise; // Esperar al valor emitido
        expect(filters).toBeInstanceOf(URLSearchParams);
        expect([...filters.entries()][0]).toEqual( [
                "Descripción",
                "ilike.**",
        ],);
        expect(spy).toHaveBeenCalledTimes(1);
        spy.mockClear();
    });
});

