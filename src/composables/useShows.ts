import type { Show } from '@/types/shows';
import { useFetch } from '@vueuse/core';
import { computed } from 'vue';
import { API } from '@/config/api';

export function useShows() {
  const { isFetching: isLoading, data: shows } = useFetch<Show[]>(
    API.shows,
  ).json();

  const showsByGenre = computed(() => {
    if (!shows.value) return {};
    const grouped: Record<string, Show[]> = {};
    const sorted = shows.value.sort(
      (a, b) => Number(b.rating.average) - Number(a.rating.average),
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
  };
}
