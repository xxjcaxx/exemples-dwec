import { setupServer } from 'msw/node';
import { http, HttpResponse } from 'msw';

import { API_BASE_URL } from '../services/colombiapi.js';


const mockAttraction = {
  "id": 36,
  "name": "Hacienda napoles",
  "description": "La Hacienda Nápoles es el nombre que tuviera en el pasado lo que hoy se conoce y reconoce como el Parque Temático Hacienda Nápoles, definido como un centro de entretenimiento familiar a espacio abierto, ubicado en Colombia, Puerto Triunfo, Antioquia, cuyo eje central es un enorme santuario para la protección de fauna en peligro o amenazada, grandes atracciones de agua, contenidos culturales, lúdicos y ambientales, y una política constante en rescate y conservación de fauna y flora. A pesar de la asociación que su nombre produce con algunos hechos sombríos del pasado reciente de la historia colombiana, el Parque Temático Hacienda Nápoles se ha construido desde cero, a partir de 2007 cuando se propuso su creación. Desde esa época se le considera como el proyecto líder de una de las más grandes transformaciones regionales que ha tenido Colombia luego de la desarticulación del Cartel de Medellín que lideraba Pablo Escobar. Hoy en día la propiedad está en cabeza del Estado colombiano, en tanto sus contenidos son desarrollados por la empresa privada.",
  "images": [
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4a/P%C3%B3rtico_Hacienda_N%C3%A1poles.JPG/800px-P%C3%B3rtico_Hacienda_N%C3%A1poles.JPG"
  ],
  "latitude": "5.887894",
  "longitude": "-74.6418",
  "cityId": 88,
  "city": {
    "id": 88,
    "name": "Puerto Triunfo",
    "description": "",
    "surface": null,
    "population": null,
    "postalCode": null,
    "departmentId": 2,
    "department": null,
    "touristAttractions": [
      null
    ],
    "presidents": null,
    "indigenousReservations": null,
    "airports": null,
    "radios": null
  }
};

const mockState = {
	cities: { mode: 'success', status: 500, expectedPage: 2, expectedLimit: 5 },
	cityDetails: { mode: 'success', status: 404 },
	searchCities: { mode: 'success', status: 500 },
	attractions: { mode: 'success', status: 500 },
	attractionDetails: { mode: 'success', status: 403 },
};

export const server = setupServer(
	http.get(`${API_BASE_URL}/City/pagedList`, ({ request }) => {
		if (mockState.cities.mode === 'error') {
			return HttpResponse.json({ message: 'error' }, { status: mockState.cities.status });
		}

		const url = new URL(request.url);
		const page = url.searchParams.get('Page');
		const pageSize = url.searchParams.get('PageSize');

		if (
			page !== String(mockState.cities.expectedPage)
			|| pageSize !== String(mockState.cities.expectedLimit)
		) {
			return HttpResponse.json({ error: 'Bad query params' }, { status: 400 });
		}

		return HttpResponse.json({
			data: [{ id: 1, name: 'Bogotá' }],
			page: Number(page),
			pageSize: Number(pageSize),
		});
	}),
	http.get(`${API_BASE_URL}/City/search`, ({ request }) => {
		if (mockState.searchCities.mode === 'error') {
			return HttpResponse.json(
				{ message: 'server error' },
				{ status: mockState.searchCities.status },
			);
		}

		const url = new URL(request.url);
		const query = url.searchParams.get('Query');

		return HttpResponse.json({
			data: [{ id: 7, name: 'Cartagena' }],
			query,
		});
	}),
	http.get(`${API_BASE_URL}/City/:cityId`, ({ params }) => {
		if (mockState.cityDetails.mode === 'error') {
			return HttpResponse.json(
				{ message: 'not found' },
				{ status: mockState.cityDetails.status },
			);
		}

		return HttpResponse.json({ id: Number(params.cityId), name: 'Medellín' });
	}),
	http.get(`${API_BASE_URL}/TouristicAttraction`, () => {
		if (mockState.attractions.mode === 'error') {
			return HttpResponse.json(
				{ message: 'server error' },
				{ status: mockState.attractions.status },
			);
		}

		return HttpResponse.json([mockAttraction]);
	}),
	http.get(`${API_BASE_URL}/TouristicAttraction/:attractionId`, ({ params }) => {
		if (mockState.attractionDetails.mode === 'error') {
			return HttpResponse.json(
				{ message: 'forbidden' },
				{ status: mockState.attractionDetails.status },
			);
		}

		return HttpResponse.json({
			id: Number(params.attractionId),
			name: 'Monserrate',
			city: 'Bogotá',
		});
	}),
);

export function resetMockState() {
	mockState.cities = { mode: 'success', status: 500, expectedPage: 2, expectedLimit: 5 };
	mockState.cityDetails = { mode: 'success', status: 404 };
	mockState.searchCities = { mode: 'success', status: 500 };
	mockState.attractions = { mode: 'success', status: 500 };
	mockState.attractionDetails = { mode: 'success', status: 403 };
}

export function mockGetCitiesSuccess(expectedPage = 2, expectedLimit = 5) {
	mockState.cities.mode = 'success';
	mockState.cities.expectedPage = expectedPage;
	mockState.cities.expectedLimit = expectedLimit;
}

export function mockGetCitiesError(status = 500) {
	mockState.cities.mode = 'error';
	mockState.cities.status = status;
}

export function mockGetCityDetailsSuccess() {
	mockState.cityDetails.mode = 'success';
}

export function mockGetCityDetailsError(status = 404) {
	mockState.cityDetails.mode = 'error';
	mockState.cityDetails.status = status;
}

export function mockSearchCitiesSuccess() {
	mockState.searchCities.mode = 'success';
}

export function mockSearchCitiesError(status = 500) {
	mockState.searchCities.mode = 'error';
	mockState.searchCities.status = status;
}

export function mockGetAttractionDetailsSuccess() {
	mockState.attractionDetails.mode = 'success';
}

export function mockGetAttractionDetailsError(status = 403) {
	mockState.attractionDetails.mode = 'error';
	mockState.attractionDetails.status = status;
}

export function mockGetAttractionsSuccess() {
	mockState.attractions.mode = 'success';
}

export function mockGetAttractionsError(status = 500) {
	mockState.attractions.mode = 'error';
	mockState.attractions.status = status;
}

export function getMockAttraction() {
	return mockAttraction;
}
