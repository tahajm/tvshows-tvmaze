<script setup lang="ts">
import RateBadge from '../RateBadge/RateBadge.vue';
import type { Show } from '../../types/shows';

const props = defineProps<{ show: Show }>();
</script>
<template>
  <article
    class="relative rounded overflow-hidden max-w-[210px] mx-auto flex flex-col gap-1"
  >
    <img
      :src="props.show.image?.medium"
      :alt="props.show.name"
      class="w-full object-cover"
    />
    <h3 class="text-sm font-medium">{{ props.show.name }}</h3>
    <div class="absolute top-1 right-1">
      <RateBadge :rate="props.show.rating.average" />
    </div>
  </article>
</template>
