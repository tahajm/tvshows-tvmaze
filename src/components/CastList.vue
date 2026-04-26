<script setup lang="ts">
import type { Cast } from '@/types/shows';
import ImagePlaceholder from '@/components/ImagePlaceholder.vue';

defineProps<{ castList: Cast[] | undefined }>();
</script>
<template>
  <p v-if="!castList || castList.length === 0" class="p-4 text-gray-400">
    No Cast Available
  </p>
  <ul v-else class="mt-6 flex gap-6 overflow-x-auto py-4" aria-label="Casts">
    <li
      v-for="cast in castList"
      :key="cast.person.id"
      class="w-40 rounded-2xl bg-white shadow-md overflow-hidden shrink-0"
    >
      <div class="h-44">
        <img
          v-if="cast.person.image?.medium"
          :src="cast.person.image.medium"
          :alt="cast.person.name"
          class="h-full w-full object-cover"
          loading="lazy"
        />
        <ImagePlaceholder v-else />
      </div>
      <div class="p-4">
        <p class="font-semibold truncate" :title="cast.person.name">
          {{ cast.person.name }}
        </p>
        <p class="text-sm text-gray-400 truncate" :title="cast.character.name">
          {{ cast.character.name }}
        </p>
      </div>
    </li>
  </ul>
</template>
