import { describe, expect, it } from 'vitest';

import { stripHtml } from './stripHtml';

describe('stripHtml', () => {
  it('returns empty string for undefined', () => {
    expect(stripHtml(undefined)).toBe('');
  });

  it('returns plain text unchanged', () => {
    expect(stripHtml('Hello world')).toBe('Hello world');
  });

  it('strips simple tags', () => {
    expect(stripHtml('<p>Hello world</p>')).toBe('Hello world');
  });

  it('strips lorem ipsum list tags and concatenates text content', () => {
    const html = `<ol><li>Lorem ipsum dolor sit amet, consectetuer adipiscing elit.</li><li>Aliquam tincidunt mauris eu risus.</li><li>Vestibulum auctor dapibus neque.</li></ol>`;
    const result = `Lorem ipsum dolor sit amet, consectetuer adipiscing elit.Aliquam tincidunt mauris eu risus.Vestibulum auctor dapibus neque.`;
    expect(stripHtml(html)).toBe(result);
  });
});
