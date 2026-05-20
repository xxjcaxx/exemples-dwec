// @vitest-environment jsdom
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';

const { mockedAttractionSubject, mockedLoadAttractionsDetails } = vi.hoisted(() => {
  let currentValue = [];
  const subscribers = new Set();

  const subject = {
    next(value) {
      currentValue = value;
      subscribers.forEach((callback) => callback(value));
    },
    subscribe(callback) {
      subscribers.add(callback);
      callback(currentValue);
      return {
        unsubscribe() {
          subscribers.delete(callback);
        },
      };
    },
    getValue() {
      return currentValue;
    },
  };

  return {
    mockedAttractionSubject: subject,
    mockedLoadAttractionsDetails: vi.fn(),
  };
});

vi.mock('../../services/colombiapi.js', () => ({
  attractionSubject: mockedAttractionSubject,
  loadAttractionsDetails: mockedLoadAttractionsDetails,
}));

import './content.js';

describe('colombia-content', () => {
  beforeEach(() => {
    mockedLoadAttractionsDetails.mockClear();
    mockedAttractionSubject.next([]);
    document.body.innerHTML = '';
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('llama a loadAttractionsDetails y renderiza atracciones emitidas', () => {
    const element = document.createElement('colombia-content');
    document.body.appendChild(element);

    expect(mockedLoadAttractionsDetails).toHaveBeenCalledTimes(1);

    mockedAttractionSubject.next([
      {
        id: 36,
        name: 'Hacienda napoles',
        description: 'Parque temático en Antioquia',
        images: ['https://example.com/attraction.jpg'],
        city: {
          name: 'Puerto Triunfo',
          department: {
            name: 'Antioquia',
            description: 'Departamento de prueba',
          },
        },
      },
    ]);

    const title = element.shadowRoot.querySelector('h3');
    const city = element.shadowRoot.querySelector('.city');

    expect(title?.textContent).toContain('Hacienda napoles');
    expect(city?.textContent).toContain('Puerto Triunfo');
  });

  test('highlightAttractions resalta solo las atracciones que coinciden', () => {
    const element = document.createElement('colombia-content');
    document.body.appendChild(element);

    mockedAttractionSubject.next([
      {
        id: 36,
        name: 'Hacienda napoles',
        description: 'Parque temático en Antioquia',
        images: ['https://example.com/attraction.jpg'],
        city: {
          name: 'Puerto Triunfo',
          department: {
            name: 'Antioquia',
            description: 'Departamento de prueba',
          },
        },
      },
      {
        id: 99,
        name: 'Catedral de Sal',
        description: 'Lugar turístico en Zipaquirá',
        images: ['https://example.com/catedral.jpg'],
        city: {
          name: 'Zipaquirá',
          department: {
            name: 'Cundinamarca',
            description: 'Otro departamento',
          },
        },
      },
    ]);

    element.highlightAttractions('hacienda');

    const items = element.shadowRoot.querySelectorAll('.attraction-item');
    const highlightedItem = items[0];
    const nonHighlightedItem = items[1];

    expect(highlightedItem.classList.contains('is-highlighted')).toBe(true);
    expect(highlightedItem.classList.contains('is-normal')).toBe(false);
    expect(nonHighlightedItem.classList.contains('is-highlighted')).toBe(false);
    expect(nonHighlightedItem.classList.contains('is-normal')).toBe(true);
  });

  test('highlightAttractions no resalta nada si el término tiene menos de 3 caracteres', () => {
    const element = document.createElement('colombia-content');
    document.body.appendChild(element);

    mockedAttractionSubject.next([
      {
        id: 36,
        name: 'Hacienda napoles',
        description: 'Parque temático en Antioquia',
        images: ['https://example.com/attraction.jpg'],
        city: {
          name: 'Puerto Triunfo',
          department: {
            name: 'Antioquia',
            description: 'Departamento de prueba',
          },
        },
      },
      {
        id: 99,
        name: 'Catedral de Sal',
        description: 'Lugar turístico en Zipaquirá',
        images: ['https://example.com/catedral.jpg'],
        city: {
          name: 'Zipaquirá',
          department: {
            name: 'Cundinamarca',
            description: 'Otro departamento',
          },
        },
      },
    ]);

    element.highlightAttractions('ha');

    const items = element.shadowRoot.querySelectorAll('.attraction-item');
    expect(items.length).toBe(2);

    items.forEach((item) => {
      expect(item.classList.contains('is-highlighted')).toBe(false);
      expect(item.classList.contains('is-normal')).toBe(true);
    });
  });
});
