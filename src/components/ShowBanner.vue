<script setup lang="ts">
import type { Show } from '@/types/shows';
import AppTag from '@/components/ui/AppTag.vue';
import { computed } from 'vue';
import RateBadge from '@/components/ui/RateBadge.vue';
import { stripHtml } from '@/utils/stripHtml';

const props = defineProps<{ show: Show }>();

const backgroundImage = computed(() => {
  if (!props.show._embedded?.images) return null;

  const background = props.show._embedded.images.find(
    (image) => image.type === 'background',
  );

  return background ? background.resolutions.original.url : null;
});

const summary = computed(() => {
  if (!props.show.summary) return '';

  return stripHtml(props.show.summary);
});
</script>
<template>
  <section class="relative overflow-hidden p-4">
    <div
      class="absolute inset-0 bg-cover bg-center blur-xs"
      :style="
        backgroundImage ? { backgroundImage: `url(${backgroundImage})` } : {}
      "
      aria-hidden="true"
    />
    <div
      class="absolute inset-0 bg-linear-to-r from-black via-black/40"
      aria-hidden="true"
    />
    <div
      class="relative flex flex-col md:flex-row py-8 px-4 md:py-16 md:px-14 gap-8"
    >
      <img
        v-if="show.image?.original"
        class="w-full md:w-sm rounded-2xl self-start shrink-0 shadow-2xl"
        :src="show.image?.original"
        :alt="show.name"
        loading="eager"
      />
      <div
        class="flex flex-col gap-6 max-w-2xl py-8 bg-black/40 px-4 rounded-2xl"
      >
        <ul class="flex flex-wrap gap-2" aria-label="Genres">
          <li v-for="genre in show.genres" :key="genre">
            <AppTag :label="genre" variant="primary" />
          </li>
        </ul>
        <h2 class="text-white font-bold text-2xl md:text-4xl">
          {{ show.name }}
        </h2>
        <RateBadge :rate="show.rating.average" />
        <div
          class="text-white flex flex-wrap gap-3 text-sm md:text-base items-center"
        >
          <span>{{ show.language }}</span>
          <span>{{ show.network?.name }}</span>
          <time
            v-if="show.averageRuntime"
            :datetime="`PT${show.averageRuntime}M`"
            >{{ show.averageRuntime }} min</time
          >
        </div>
        <AppTag :label="show.status" sr-prefix="Status: " class="w-fit" />
        <p
          v-if="show.summary"
          class="overflow-hidden text-gray-200 text-sm md:text-base line-clamp-8"
        >
          {{ summary }}
        </p>
      </div>
    </div>
  </section>
</template>
