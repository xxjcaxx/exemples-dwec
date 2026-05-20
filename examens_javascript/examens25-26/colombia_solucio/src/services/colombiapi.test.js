import { afterAll, afterEach, beforeAll, describe, expect, test } from 'vitest';

import {
  attractionSubject,
  getAttractionDetails,
  getAttractions,
  getCities,
  getCityDetails,
  loadAttractionsDetails,
} from './colombiapi.js';
import {
  getMockAttraction,
  mockGetAttractionDetailsError,
  mockGetAttractionDetailsSuccess,
  mockGetAttractionsError,
  mockGetAttractionsSuccess,
  mockGetCitiesError,
  mockGetCitiesSuccess,
  mockGetCityDetailsError,
  mockGetCityDetailsSuccess,
  resetMockState,
  server,
} from '../test/mswServer.js';

beforeAll(() => {
  server.listen({ onUnhandledRequest: 'error' });
});

afterEach(() => {
  resetMockState();
  attractionSubject.next([]);
});

afterAll(() => {
  server.close();
});

describe('colombiapi service', () => {
  test('getCities devuelve ciudades paginadas', async () => {
    mockGetCitiesSuccess(2, 5);

    const result = await getCities(2, 5);

    expect(result).toEqual({
      data: [{ id: 1, name: 'Bogotá' }],
      page: 2,
      pageSize: 5,
    });
  });

  test('getCities lanza error si la respuesta no es ok', async () => {
    mockGetCitiesError(500);

    await expect(getCities()).rejects.toThrow('Failed to fetch cities');
  });

  test('getCityDetails devuelve detalle de una ciudad', async () => {
    mockGetCityDetailsSuccess();

    const result = await getCityDetails(10);

    expect(result).toEqual({ id: 10, name: 'Medellín' });
  });

  test('getCityDetails lanza error si falla la petición', async () => {
    mockGetCityDetailsError(404);

    await expect(getCityDetails(10)).rejects.toThrow('Failed to fetch city details');
  });

  test('getAttractions devuelve lista de atracciones desde el mock', async () => {
    mockGetAttractionsSuccess();

    const result = await getAttractions();

    expect(result).toHaveLength(1);
    expect(result[0]).toMatchObject(getMockAttraction());
  });

  test('getAttractions lanza error si la petición falla', async () => {
    mockGetAttractionsError(500);

    await expect(getAttractions()).rejects.toThrow('Failed to fetch attractions');
  });

  test('getAttractionDetails devuelve detalle de atracción', async () => {
    mockGetAttractionDetailsSuccess();

    const result = await getAttractionDetails(3);

    expect(result).toEqual({
      id: 3,
      name: 'Monserrate',
      city: 'Bogotá',
    });
  });

  test('getAttractionDetails lanza error si falla la petición', async () => {
    mockGetAttractionDetailsError(403);

    await expect(getAttractionDetails(3)).rejects.toThrow('Failed to fetch attraction details');
  });

  test('loadAttractionsDetails emite datos enriquecidos con ciudad', async () => {
    mockGetAttractionsSuccess();
    mockGetCityDetailsSuccess();

    const emissions = [];
    const subscription = attractionSubject.subscribe((value) => {
      emissions.push(value);
    });

    await loadAttractionsDetails();

    const finalEmission = emissions.at(-1);

    expect(emissions.length).toBeGreaterThan(1);
    expect(finalEmission).toHaveLength(1);
    expect(finalEmission[0].name).toBe(getMockAttraction().name);
    expect(finalEmission[0].city).toEqual({ id: 88, name: 'Medellín' });

    subscription.unsubscribe();
  });

  test('loadAttractionsDetails captura errores y mantiene el estado', async () => {
    mockGetAttractionsError(500);

    const before = attractionSubject.getValue();
    await loadAttractionsDetails();

    expect(attractionSubject.getValue()).toEqual(before);
  });
});
