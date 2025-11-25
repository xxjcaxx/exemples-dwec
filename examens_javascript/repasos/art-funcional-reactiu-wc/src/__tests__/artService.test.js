import { describe, test, expect, vi, beforeEach, afterEach, beforeAll, afterAll } from 'vitest';
import * as service from '../services/artService.js';
import { _ } from '../utils.js';
import { http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node';
import { BehaviorSubject,firstValueFrom } from 'rxjs';

const mockResposta = {data:[{

		"_score": 21311.514,
		"id": 129884,
		"api_model": "artworks",
		"api_link": "https://api.artic.edu/api/v1/artworks/129884",
		"is_boosted": true,
		"title": "Starry Night and the Astronauts",
		"thumbnail": {
			"lqip": "data:image/gif;base64,R0lGODlhBAAFAPQAABw/Zhg/aBRBaBZBahRCaxxBahxEahNIchZJcR9LdB9OdiZIZSBEbShLbjxRZyBPeipRcSpReUpWaitXgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACH5BAAAAAAALAAAAAAEAAUAAAURoMJIDhJAywAcAlEkxhNNTQgAOw==",
			"width": 5376,
			"height": 6112,
			"alt_text": "Abstract painting composed of small vertical dabs of multiple shades of blue with a small area of similar strokes of red, orange, and yellow in the upper right."
		},
		"timestamp": "2025-11-24T23:20:18-06:00"
	
}]};

const mockServer = setupServer(
        http.get('https://www.artic.edu*', () => {
          
          
            return HttpResponse.json(mockResposta); 
        }),
        http.get('https://api.artic.edu/api/v1/artworks/129884', () => {
           
            return HttpResponse.json({
                data: {
                    id: 129884,
                    image_id: 'abcd1234'
                }
            });
        }),
        http.get('https://api.artic.edu/api/v1/artworks/search?q=filtredeprova', () => {
            return HttpResponse.json(mockResposta);
        }),
      );

describe('artService', () => {
  test('addImgUrL adds img_url property based on image_id', () => {
    const input = { id: 1, image_id: 'abc123', title: 'Title' };
    const out = service.addImgUrL(input);

    expect(out).toBeDefined();
    expect(out).toBeInstanceOf(Object);
    expect(out).not.toBe(input);
    expect('img_url' in out).toBe(true);
    expect(out.img_url).toBe(`https://www.artic.edu/iiif/2/${input.image_id}/full/843,/0/default.jpg`);
    expect(out.id).toBe(input.id);
    expect(out.title).toBe(input.title);
  });

  describe('getArts unitari (_.getURL mockejat)', () => {
    let origGetURL;
    beforeEach(() => {
      origGetURL = _.getURL;
    });
    afterEach(() => {
      _.getURL = origGetURL;
    });

    test('returns list of artworks with img_url when _.getURL returns {data: [...] }', async () => {
      const apiData = { data: [{ id: 1 }, { id: 2}] };
      _.getURL = vi.fn().mockResolvedValue(apiData);
      const res = await service.getArts('https://example.test');
      expect(res).toHaveLength(2);
      expect(res[0].id).toBe(apiData.data[0].id);
    });

    test('returns empty array when data shape is unexpected', async () => {
      _.getURL = vi.fn().mockResolvedValue({ foo: 'bar' });
      const res = await service.getArts('https://example.test');
      expect(res).toEqual([]);
    });
  });

  describe("getArts composició (_.getURL real, servidor mockejat)", () => {
    beforeAll(() => mockServer.listen());
    afterEach(() => mockServer.resetHandlers());
    afterAll(() => mockServer.close());

    test('fetches artworks from mocked API and adds img_url', async () => {
      const res = await service.getArts('https://www.artic.edu/api/v1/artworks?page=1&limit=2');

      expect(res).toBeDefined();
      expect(Array.isArray(res)).toBe(true);
      expect(res.length).toBeGreaterThan(0);
      expect(res[0]).toEqual(mockResposta.data[0]);
      
    });
  });


  describe('getArts integration (_.getURL real)', () => {
    test('fetches artworks from real API and adds img_url', async () => {
      const res = await service.getArts('https://api.artic.edu/api/v1/artworks?page=1&limit=2');
      expect(res).toBeDefined();
      expect(Array.isArray(res)).toBe(true);
      expect(res.length).toBeGreaterThan(0);
      expect('image_id' in res[0]).toBe(true);
    });
  });

  describe('getAllDataArtWork (_.getURL real, servidor mockejat)', () => {
    beforeAll(() => mockServer.listen());
    afterEach(() => mockServer.resetHandlers());
    afterAll(() => mockServer.close());

    test('fetches full data for an artwork and adds img_url', async () => {
      const artWork = { id: 129884 };
      const res = await service.getAllDataArtWork(artWork);

      expect(res).toBeDefined();
      expect(res.id).toBe(129884);
      expect('img_url' in res).toBe(true);
      expect(res.img_url).toBe('https://www.artic.edu/iiif/2/abcd1234/full/843,/0/default.jpg');
    });
  });
  

  describe('searchArts (_.getURL real, servidor mockejat)', () => {
    beforeAll(() => mockServer.listen());
    afterEach(() => mockServer.resetHandlers());
    afterAll(() => mockServer.close()); 
    test('calls getArts and returns processed artworks', async () => {
      const filter = 'filtredeprova';
      const trigger$ = new BehaviorSubject(filter);
      
      const arts$ = service.searchArts(trigger$);
      const promise = firstValueFrom(arts$);
      arts$.subscribe(r=> console.log('Arts received:', r.length));
      let result = await promise;
      
      
      expect(result).toBeDefined();
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBeGreaterThan(0);
      expect('img_url' in result[0]).toBe(true);
      expect(result[0].img_url).toBe('https://www.artic.edu/iiif/2/abcd1234/full/843,/0/default.jpg');
      expect(result[0].id).toBe(mockResposta.data[0].id);
      expect(result[0].title).toBe(mockResposta.data[0].title);
      expect(result[0].description).toBe(mockResposta.data[0].description);
    
    });
  });
 
});
