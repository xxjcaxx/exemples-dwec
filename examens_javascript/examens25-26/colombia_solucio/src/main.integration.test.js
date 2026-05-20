// @vitest-environment jsdom
import { beforeAll, beforeEach, describe, expect, test, vi } from 'vitest';

const {
  mockedAttractionSubject,
  mockedLoadAttractionsDetails,
  mockAttractions,
} = vi.hoisted(() => {
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
  };

  const attractions = [
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
  ];

  return {
    mockedAttractionSubject: subject,
    mockedLoadAttractionsDetails: vi.fn(() => {
      subject.next(attractions);
    }),
    mockAttractions: attractions,
  };
});

vi.mock('./services/colombiapi.js', () => ({
  attractionSubject: mockedAttractionSubject,
  loadAttractionsDetails: mockedLoadAttractionsDetails,
}));

describe('integración header + content', () => {
  beforeAll(async () => {
    await import('./main.js');
  });

  beforeEach(() => {
    mockedLoadAttractionsDetails.mockClear();
    mockedAttractionSubject.next([]);
    document.body.innerHTML = `
      <colombia-header></colombia-header>
      <colombia-content></colombia-content>
    `;
  });

  test('al buscar en header se resalta una atracción en content', async () => {
    document.dispatchEvent(new Event('DOMContentLoaded'));

    const header = document.querySelector('colombia-header');
    const content = document.querySelector('colombia-content');

    const input = header.shadowRoot.querySelector('.search-input');
    input.value = 'hacienda';
    input.dispatchEvent(new Event('input', { bubbles: true, composed: true }));

    const items = content.shadowRoot.querySelectorAll('.attraction-item');

    expect(mockedLoadAttractionsDetails).toHaveBeenCalled();
    expect(items.length).toBe(2);
    expect(items[0].classList.contains('is-highlighted')).toBe(true);
    expect(items[1].classList.contains('is-normal')).toBe(true);
    expect(items[0].querySelector('h3')?.textContent).toContain(mockAttractions[0].name);
  });
});
