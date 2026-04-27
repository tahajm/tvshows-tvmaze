<script setup lang="ts">
import type { SearchResult } from '@/types/shows';
import ShowCard from '@/components/ShowCard.vue';
import { computed } from 'vue';

const props = defineProps<{ searchResults: SearchResult[] | null }>();

const resultsTitle = computed(() => {
  if (!props.searchResults) return 'Results';
  if (!props.searchResults.length) return 'No Results Found';

  return `${props.searchResults.length} Results Found`;
});
</script>
<template>
  <section class="mx-auto max-w-7xl px-4 py-8">
    <h3 class="py-8 font-semibold text-lg" aria-live="polite">
      {{ resultsTitle }}
    </h3>
    <ol class="flex flex-wrap gap-4">
      <li v-for="result in searchResults" :key="result.show.id">
        <ShowCard :show="result.show" />
      </li>
    </ol>
  </section>
</template>
