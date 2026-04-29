<script setup lang="ts">
import AppTag from '@/components/ui/AppTag.vue';
import RateBadge from '@/components/ui/RateBadge.vue';
import type { Show } from '@/types/shows';

defineProps<{ show: Show; summary: string }>();
</script>
<template>
  <div class="flex flex-col gap-6 max-w-2xl py-8 bg-black/40 px-4 rounded-2xl">
    <ul class="flex flex-wrap gap-2" aria-label="Genres">
      <li v-for="genre in show.genres" :key="genre">
        <AppTag :label="genre" variant="primary" />
      </li>
    </ul>
    <h2 class="text-white font-bold text-2xl md:text-4xl">{{ show.name }}</h2>
    <RateBadge :rate="show.rating.average" />
    <div
      class="text-white flex flex-wrap gap-3 text-sm md:text-base items-center"
    >
      <span aria-label="Language">{{ show.language }}</span>
      <span aria-label="Channel">
        {{ show.network?.name ?? show.webChannel?.name }}
      </span>
      <time
        v-if="show.averageRuntime"
        :datetime="`PT${show.averageRuntime}M`"
        aria-label="Runtime"
      >
        {{ show.averageRuntime }} min
      </time>
    </div>
    <AppTag :label="show.status" sr-prefix="Status: " class="w-fit" />
    <p
      v-if="summary"
      class="overflow-hidden text-gray-200 text-sm md:text-base line-clamp-8"
    >
      {{ summary }}
    </p>
  </div>
</template>
