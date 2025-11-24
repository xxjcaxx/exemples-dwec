import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import * as service from '../services/artService.js';
import { _ } from '../utils.js';

describe('artService', () => {
  test('addImgUrL adds img_url property based on image_id', () => {
    const input = { id: 1, image_id: 'abc123', title: 'Title' };
    const out = service.addImgUrL(input);
    expect(out).toBeDefined();
    expect(out).toBeInstanceOf(Object);
    expect(out).not.toBe(input);
    expect(out).toContain('img_url');
    expect(out.img_url).toBe(`https://www.artic.edu/iiif/2/${input.image_id}/full/843,/0/default.jpg`);
    expect(out.id).toBe(input.id);
    expect(out.title).toBe(input.title);
  });

  describe('getArts', () => {
    let origGetURL;
    beforeEach(() => {
      origGetURL = _.getURL;
    });
    afterEach(() => {
      _.getURL = origGetURL;
    });

    test('returns list of artworks with img_url when _.getURL returns {data: [...] }', async () => {
      const apiData = { data: [{ id: 1, image_id: 'img1' }, { id: 2, image_id: 'img2' }] };
      _.getURL = vi.fn().mockResolvedValue(apiData);
      const res = await service.getArts('https://example.test');
      //console.log(res);
      
      expect(res).toHaveLength(2);
      expect(res[0].img_url).toContain(apiData.data[0].image_id);
    });

    test('returns empty array when data shape is unexpected', async () => {
      _.getURL = vi.fn().mockResolvedValue({ foo: 'bar' });
      const res = await service.getArts('https://example.test');
      expect(res).toEqual([]);
    });
  });

  test('getALlDataArtworks resolves each artwork via getAllDataArtWork', async () => {
    const arts = [{ id: 1 }, { id: 2 }];
    // spy on getAllDataArtWork
    const spy = vi.spyOn(service, 'getAllDataArtWork').mockImplementation(async (a) => ({ ...a, extra: true }));
    const res = await service.getALlDataArtworks(arts);
    expect(res).toHaveLength(2);
    expect(res[0].extra).toBe(true);
    spy.mockRestore();
  });

  test('searchArts calls getArts and returns processed artworks', async () => {
    const spyGetArts = vi.spyOn(service, 'getArts').mockResolvedValue([{ id: 1, image_id: 'i1' }]);
    const spyGetAll = vi.spyOn(service, 'getALlDataArtworks').mockResolvedValue([{ id: 1, image_id: 'i1' }]);
    const res = await service.searchArts('dog');
    expect(spyGetArts).toHaveBeenCalled();
    expect(spyGetAll).toHaveBeenCalled();
    expect(Array.isArray(res)).toBe(true);
    spyGetArts.mockRestore();
    spyGetAll.mockRestore();
  });
});
