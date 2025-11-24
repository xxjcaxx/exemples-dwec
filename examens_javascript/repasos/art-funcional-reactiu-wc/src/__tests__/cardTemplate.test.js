import { it, expect, describe } from 'vitest';
import { cardTemplate } from '../components/artCard/artCard.js';

describe('cardTemplate', () => {
  it('renders an artWork into template string', () => {
    const artWork = {
      img_url: 'https://example.test/img.jpg',
      title: 'Mona Lisa',
      provenance_text: 'Louvre'
    };
    const tpl = cardTemplate(artWork);
    expect(tpl).toContain(artWork.img_url);
    expect(tpl).toContain(artWork.title);
    expect(tpl).toContain(artWork.provenance_text);
  });
});
