<script setup lang="ts">
import ImagePlaceholder from '@/components/ui/ImagePlaceholder.vue';
import RateBadge from '@/components/ui/RateBadge.vue';
import type { Episode } from '@/types/shows';
import { formatDate } from '@/utils/formatDate';

defineProps<{ episode: Episode }>();
</script>
<template>
  <div class="flex items-center gap-6 py-4 hover:bg-gray-50 px-2 rounded-xl">
    <span class="text-sm text-gray-500 text-center">
      {{ episode.number }}
    </span>
    <div class="hidden md:block h-24">
      <img
        v-if="episode.image?.medium"
        :src="episode.image.medium"
        :alt="episode.name"
        loading="lazy"
        class="h-full rounded-lg"
      />
      <ImagePlaceholder v-else class="rounded-lg aspect-video" />
    </div>
    <div class="flex flex-col gap-1 flex-1 min-w-8">
      <h4 class="font-medium truncate">
        {{ episode.name }}
      </h4>
      <div
        class="text-sm text-gray-500 flex gap-3 whitespace-nowrap overflow-hidden"
      >
        <time v-if="episode.airdate" :datetime="episode.airdate">
          {{ formatDate(episode.airdate) }}
        </time>
        <time :datetime="`PT${episode.runtime}M`">
          {{ episode.runtime }} min
        </time>
      </div>
    </div>
    <RateBadge :rate="episode.rating.average" />
  </div>
</template>
