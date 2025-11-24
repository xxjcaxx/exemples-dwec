import { describe, test, expect, vi, beforeEach, afterEach } from 'vitest';
import { _ } from '../utils.js';

describe('utils _',  () => {
  test('compose composes functions right-to-left', async () => {
    const add1 = x => x + 1;
    const mul2 = x => x * 2;
    const f =  _.compose(add1, mul2);
    expect(await f(2)).toBe(5); // add1(mul2(2)) => add1(4) => 5
  });

  describe('getURL', () => {
    const ORIGINAL_FETCH = globalThis.fetch;  // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/globalThis
    beforeEach(() => {
      globalThis.fetch = vi.fn();
    });
    afterEach(() => {
      globalThis.fetch = ORIGINAL_FETCH;
    });

    test('calls fetch and returns json result', async () => {
      globalThis.fetch.mockResolvedValue({ json: async () => ({ ok: true }) });
      const res = await _.getURL('https://example.test');
      expect(res).toEqual({ ok: true });
      expect(globalThis.fetch).toHaveBeenCalledWith('https://example.test');
    });
  });

  test('fillContainer appends element and returns container', () => {
    const container = document.createElement('div');
    const child = document.createElement('span');
    const result = _.fillContainer(container)(child);
    expect(result).toBe(container);
    expect(container.firstChild).toBe(child);
  });
});
