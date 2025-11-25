import { test, expect, describe } from 'vitest';
import { cardTemplate } from '../components/artCard/artCard.js';

describe('cardTemplate', () => {
  test('renders an artWork into template string', () => {
    const artWork = {
      img_url: 'https://example.test/img.jpg',
      title: 'Mona Lisa',
      description: 'Louvre'
    };
    const tpl = cardTemplate(artWork);

    expect(tpl).toContain(artWork.img_url);
    expect(tpl).toContain(artWork.title);
    expect(tpl).toContain(artWork.description);
  });
});
