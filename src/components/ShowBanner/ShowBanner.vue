<script setup lang="ts">
import type { Show } from '@/types/shows';
import ShowBannerContent from './ShowBannerContent.vue';
import { useShowBanner } from './showBanner.composable';

const props = defineProps<{ show: Show }>();

const { backgroundImage, summary } = useShowBanner(() => props.show);
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
        :src="show.image.original"
        :alt="show.name"
        loading="eager"
      />
      <ShowBannerContent :show="show" :summary="summary" />
    </div>
  </section>
</template>
