<script setup lang="ts">
import type { Cast } from '@/types/shows';
import AppCard from '@/components/ui/AppCard.vue';

defineProps<{ castList: Cast[] | undefined }>();
</script>
<template>
  <p v-if="!castList || castList.length === 0" class="p-4 text-gray-400">
    No Cast Available
  </p>
  <ul v-else class="mt-6 flex gap-6 overflow-x-auto py-4" aria-label="Casts">
    <li v-for="cast in castList" :key="cast.person.id">
      <AppCard
        :image="cast.person.image?.medium"
        :imageAlt="cast.person.name"
        :title="cast.person.name"
        :subtitle="cast.character.name"
        size="small"
      />
    </li>
  </ul>
</template>
