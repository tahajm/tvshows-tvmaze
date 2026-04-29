import { beforeEach, describe, expect, it, vi } from 'vitest';
import { nextTick, type Ref, ref } from 'vue';

import { useSearch } from '../useSearch';

const mockExecute = vi.fn();

vi.mock('@vueuse/core', () => ({
  refDebounced: (r: Ref<string, string>) => r,
  useFetch: vi.fn(() => ({
    json: () => ({
      data: ref(null),
      isFetching: ref(false),
      error: ref(null),
      execute: mockExecute,
    }),
  })),
}));

describe('useSearch', () => {
  beforeEach(() => {
    mockExecute.mockClear();
  });

  it('initializes with empty search term and no data', () => {
    const { searchTerm, data, isLoading, error } = useSearch();
    expect(searchTerm.value).toBe('');
    expect(data.value).toBeNull();
    expect(isLoading.value).toBe(false);
    expect(error.value).toBeNull();
  });

  it('triggers fetch when search term is set', async () => {
    const { searchTerm } = useSearch();
    searchTerm.value = 'Breaking Bad';
    await nextTick();
    expect(mockExecute).toHaveBeenCalledOnce();
  });

  it('does not fetch for empty search term', async () => {
    const { searchTerm } = useSearch();
    searchTerm.value = 'foo';
    await nextTick();
    mockExecute.mockClear();
    searchTerm.value = '';
    await nextTick();
    expect(mockExecute).not.toHaveBeenCalled();
  });
});
