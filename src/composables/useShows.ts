import { useFetch } from '@vueuse/core';
import { computed } from 'vue';

import { API } from '@/config/api';
import type { Show } from '@/types/shows';

export function useShows() {
  const {
    isFetching: isLoading,
    data: shows,
    error,
  } = useFetch<Show[]>(API.shows).json();

  const showsByGenre = computed(() => {
    if (!shows.value) return {};
    const grouped: Record<string, Show[]> = {};
    const sorted: Show[] = [...shows.value].sort(
      (a, b) => (b.rating?.average ?? 0) - (a.rating?.average ?? 0),
    );

    sorted.forEach((show) => {
      show.genres.forEach((genre) => {
        if (!grouped[genre]) grouped[genre] = [];
        grouped[genre].push(show);
      });
    });

    return grouped;
  });

  return {
    isLoading,
    showsByGenre,
    error,
  };
}
