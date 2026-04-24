import { onMounted, ref } from 'vue';
import { getShowsFromApi } from '../api/shows';
import type { Show } from '../types/shows';

export function useShows() {
  const isLoading = ref(false);
  const shows = ref<Show[]>([]);

  onMounted(async () => {
    isLoading.value = true;
    shows.value = await getShowsFromApi();
    isLoading.value = false;
  });

  return {
    isLoading,
    shows,
  };
}
