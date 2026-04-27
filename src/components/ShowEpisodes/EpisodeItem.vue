<script setup lang="ts">
import type { Episode } from '@/types/shows';
import RateBadge from '@/components/ui/RateBadge.vue';
import ImagePlaceholder from '@/components/ui/ImagePlaceholder.vue';
import { formatDate } from '@/utils/formatDate';

defineProps<{ episode: Episode }>();
</script>
<template>
  <div class="flex items-center gap-6 py-4 hover:bg-gray-50 px-2 rounded-xl">
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
  </div>
</template>
