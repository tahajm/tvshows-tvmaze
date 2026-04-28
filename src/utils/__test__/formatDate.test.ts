import { describe, expect, it } from 'vitest';

import { formatDate } from '../formatDate';

describe('formatDate', () => {
  it('formats a valid date string', () => {
    expect(formatDate('2024-01-15')).toBe('Jan 15, 2024');
  });

  it('returns empty string for null', () => {
    expect(formatDate(null)).toBe('');
  });

  it('it returns empty string for non valid dates', () => {
    expect(formatDate('invalid date')).toBe('');
  });
});
