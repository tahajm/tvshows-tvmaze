<script setup lang="ts">
import type { Episode } from '@/types/shows';
import EpisodeListSeason from '@/components/EpisodeListSeason.vue';
import EpisodeListItem from '@/components/EpisodeListItem.vue';
import { computed, ref } from 'vue';

const props = defineProps<{ episodes: Episode[] | undefined }>();

const selectedSeason = ref<number | null>(null);
const seasonList = computed(() => {
  if (!props.episodes) return [];
  return [...new Set(props.episodes.map((e) => e.season))];
});

const activeSeason = computed(() =>
  seasonList.value.includes(selectedSeason.value!)
    ? selectedSeason.value
    : (seasonList.value[0] ?? null),
);

const filteredEpisodes = computed(
  () => props.episodes?.filter((e) => e.season === activeSeason.value) ?? [],
);
</script>
<template>
  <EpisodeListSeason
    :seasons="seasonList"
    :activeSeason="activeSeason"
    @select="selectedSeason = $event"
  />
  <ol
    v-if="filteredEpisodes.length > 0"
    class="flex flex-col divide-y divide-gray-100"
    aria-label="Episodes"
  >
    <li v-for="episode in filteredEpisodes" :key="episode.id">
      <EpisodeListItem :episode="episode" />
    </li>
  </ol>
  <p v-else class="p-4 text-gray-400">No Episodes Available</p>
</template>
