import { refDebounced, useFetch } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

import { API } from '@/config/api';
import { SEARCH_DEBOUNCE_TIME } from '@/config/app';
import type { SearchResult } from '@/types/shows';

export function useSearch() {
  const searchTerm = ref('');
  const debouncedTerm = refDebounced(searchTerm, SEARCH_DEBOUNCE_TIME);

  const url = computed(() => {
    return API.searchShows(debouncedTerm.value.trim());
  });

  const {
    data,
    isFetching: isLoading,
    error,
    execute,
  } = useFetch<SearchResult[]>(url, {
    immediate: false,
  }).json();

  watch(debouncedTerm, (value) => {
    if (value) {
      execute();
    } else {
      data.value = null;
      error.value = null;
    }
  });

  return {
    data,
    isLoading,
    error,
    searchTerm,
    debouncedTerm,
  };
}
