<script setup lang="ts">
import type { Episode } from '@/types/shows';
import RateBadge from '@/components/ui/RateBadge.vue';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder.vue';
import { formatDate } from '@/utils/formatDate';
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
  <div class="flex items-center gap-4">
    <h3 class="font-semibold text-lg shrink-0">Seasons:</h3>
    <ol class="flex gap-2 items-center overflow-x-auto py-1">
      <li
        :class="[
          activeSeason === season
            ? 'bg-primary text-white'
            : 'border-primary text-primary',
        ]"
        class="border flex rounded-lg shrink-0"
        v-for="(season, index) in seasonList"
        :key="index"
      >
        <button
          @click="selectedSeason = season"
          class="py-2 px-4 cursor-pointer"
        >
          {{ season }}
        </button>
      </li>
    </ol>
  </div>
  <ol
    v-if="filteredEpisodes.length > 0"
    class="flex flex-col divide-y divide-gray-100"
    aria-label="Episodes"
  >
    <li
      v-for="episode in filteredEpisodes"
      :key="episode.id"
      class="flex items-center gap-6 py-4 hover:bg-gray-50 px-2 rounded-xl"
    >
      <span class="text-sm text-gray-400 text-center">
        {{ episode.number }}
      </span>
      <div class="hidden md:block">
        <img
          v-if="episode.image?.medium"
          :src="episode.image.medium"
          :alt="episode.name"
          loading="lazy"
          class="h-24 rounded-lg"
        />
        <ImagePlaceholder v-else class="rounded-lg" />
      </div>
      <div class="flex flex-col gap-1 flex-1 min-w-8" :title="episode.name">
        <h3 class="font-medium truncate" aria-label="Name">
          {{ episode.name }}
        </h3>
        <div
          class="text-sm text-gray-400 flex gap-3 whitespace-nowrap overflow-hidden"
        >
          <time
            v-if="episode.airdate"
            aria-label="Air Date"
            :datetime="episode.airdate"
            >{{ formatDate(episode.airdate) }}</time
          >
          <time aria-label="Runtime" :datetime="`PT${episode.runtime}M`"
            >{{ episode.runtime }} min</time
          >
        </div>
      </div>
      <RateBadge :rate="episode.rating.average" />
    </li>
  </ol>
  <p v-else class="p-4 text-gray-400">No Episodes Available</p>
</template>
