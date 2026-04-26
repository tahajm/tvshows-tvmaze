<script setup lang="ts">
import RateBadge from '@/components/RateBadge.vue';
import AppTag from '@/components/AppTag.vue';
import type { Show } from '@/types/shows';

const props = defineProps<{ show: Show }>();
</script>

<template>
  <RouterLink :to="`/show/${props.show.id}`">
    <article class="show-card group">
      <div class="overflow-hidden">
        <img
          :src="props.show.image?.medium"
          :alt="props.show.name"
          loading="lazy"
          class="show-image"
        />
      </div>
      <div class="p-3">
        <h3 class="text-sm sm:text-base md:text-lg font-medium mb-4 truncate">
          {{ props.show.name }}
        </h3>
        <div class="hidden sm:flex gap-1 flex-wrap">
          <AppTag :label="props.show.status" />
          <AppTag :label="props.show.language" />
        </div>
      </div>
      <div class="absolute top-1 right-1">
        <RateBadge :rate="props.show.rating.average" />
      </div>
    </article>
  </RouterLink>
</template>

<style scoped>
@reference "@/style.css";

.show-card {
  @apply relative rounded-xl overflow-hidden 
  mx-auto flex flex-col bg-white shadow-lg 
  duration-300 hover:-translate-y-1 
  w-36 sm:w-44 md:w-52
  hover:shadow-2xl;
}

.show-image {
  @apply transition-transform duration-300 group-hover:scale-105;
}
</style>
