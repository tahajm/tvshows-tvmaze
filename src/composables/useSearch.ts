import { API } from '@/config/api';
import type { SearchResult } from '@/types/shows';
import { refDebounced, useFetch } from '@vueuse/core';
import { computed, ref, watch } from 'vue';

export function useSearch() {
  const DEBOUNCE_TIME = 300;
  const searchTerm = ref('');
  const debouncedTerm = refDebounced(searchTerm, DEBOUNCE_TIME);

  const url = computed(() => {
    return API.searchShows(debouncedTerm.value);
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
