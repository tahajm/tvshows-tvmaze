<script setup lang="ts">
import { computed } from 'vue';

import type { Show } from '@/types/shows';
import { stripHtml } from '@/utils/stripHtml';

import ShowBannerContent from './ShowBannerContent.vue';

const props = defineProps<{ show: Show }>();

const backgroundImage = computed(() => {
  const background = props.show._embedded?.images?.find(
    (image) => image.type === 'background',
  );
  return background ? background.resolutions.original.url : null;
});

const summary = computed(() =>
  props.show.summary ? stripHtml(props.show.summary) : '',
);
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
        class="w-full md:w-sm aspect-2/3 object-cover rounded-2xl self-start shrink-0 shadow-2xl"
        :src="show.image.original"
        :srcset="`${show.image.medium} 1x, ${show.image.original} 2x`"
        :alt="show.name"
        loading="eager"
        fetchpriority="high"
      />
      <ShowBannerContent :show="show" :summary="summary" />
    </div>
  </section>
</template>
