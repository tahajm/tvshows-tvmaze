<script setup lang="ts">
import RateBadge from '@/components/RateBadge.vue';
import type { Show } from '@/types/shows';

const props = defineProps<{ show: Show }>();
</script>
<template>
  <RouterLink :to="`/show/${show.id}`">
    <article
      class="relative rounded overflow-hidden w-[210px] mx-auto flex flex-col gap-1"
    >
      <img
        :src="props.show.image?.medium"
        :alt="props.show.name"
        class="object-cover rounded"
      />
      <h3 class="text-sm font-medium">{{ props.show.name }}</h3>
      <div class="absolute top-1 right-1">
        <RateBadge :rate="props.show.rating.average" />
      </div>
    </article>
  </RouterLink>
</template>
