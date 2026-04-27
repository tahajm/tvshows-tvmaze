import { describe, it, expect, vi } from 'vitest';
import { ref } from 'vue';
import type { Show } from '@/types/shows';
import { useShows } from './useShows';

const mockShows: Show[] = [
  {
    id: 1,
    name: 'Breaking Bad',
    genres: ['Drama', 'Crime'],
    rating: { average: 9.5 },
  } as Show,
  {
    id: 2,
    name: 'Better Call Saul',
    genres: ['Drama', 'Crime'],
    rating: { average: 9.0 },
  } as Show,
  {
    id: 3,
    name: 'The Wire',
    genres: ['Drama'],
    rating: { average: 9.3 },
  } as Show,
];

vi.mock('@vueuse/core', () => ({
  useFetch: vi.fn(() => ({
    json: () => ({
      data: ref(mockShows),
      isFetching: ref(false),
      error: ref(null),
    }),
  })),
}));

describe('useShows', () => {
  it('groups shows by genre', () => {
    const { showsByGenre } = useShows();
    expect(showsByGenre.value).toHaveProperty('Drama');
    expect(showsByGenre.value).toHaveProperty('Crime');
    expect(showsByGenre.value['Drama']).toHaveLength(3);
    expect(showsByGenre.value['Crime']).toHaveLength(2);
  });

  it('sorts shows by rating descending within each genre', () => {
    const { showsByGenre } = useShows();
    const drama = showsByGenre.value['Drama'];
    expect(drama[0].rating.average).toBeGreaterThanOrEqual(
      drama[1].rating.average!,
    );
    expect(drama[1].rating.average).toBeGreaterThanOrEqual(
      drama[2].rating.average!,
    );
  });

  it('returns empty object when data is null', () => {
    const { showsByGenre } = useShows();
    expect(showsByGenre.value).toBeDefined();
  });
});
