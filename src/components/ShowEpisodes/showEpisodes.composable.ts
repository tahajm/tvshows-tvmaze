import type { Episode } from '@/types/shows';
import { computed, ref } from 'vue';

export function useShowEpisodes(episodes: () => Episode[] | undefined) {
  const selectedSeason = ref<number | null>(null);

  const seasonList = computed(() => {
    const list = episodes();
    if (!list) return [];
    return [...new Set(list.map((e) => e.season))];
  });

  const activeSeason = computed(() =>
    seasonList.value.includes(selectedSeason.value!)
      ? selectedSeason.value
      : (seasonList.value[0] ?? null),
  );

  const filteredEpisodes = computed(
    () => episodes()?.filter((e) => e.season === activeSeason.value) ?? [],
  );

  return { selectedSeason, seasonList, activeSeason, filteredEpisodes };
}
