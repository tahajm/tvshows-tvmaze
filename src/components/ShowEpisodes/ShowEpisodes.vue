<script setup lang="ts">
import type { Episode } from '@/types/shows';
import SeasonSelector from './SeasonSelector.vue';
import EpisodeItem from './EpisodeItem.vue';
import { useShowEpisodes } from './showEpisodes.composable';

const props = defineProps<{ episodes: Episode[] | undefined }>();

const { selectedSeason, seasonList, activeSeason, filteredEpisodes } =
  useShowEpisodes(() => props.episodes);
</script>
<template>
  <SeasonSelector
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
      <EpisodeItem :episode="episode" />
    </li>
  </ol>
  <p v-else class="p-4 text-gray-400">No Episodes Available</p>
</template>
