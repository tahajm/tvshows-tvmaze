<script setup lang="ts">
defineProps<{ seasons: number[]; activeSeason: number | null }>();
const emit = defineEmits<{ select: [season: number] }>();
</script>

<template>
  <div class="flex items-center gap-4">
    <h3 class="font-semibold text-lg shrink-0">Seasons:</h3>
    <ol class="flex gap-2 items-center overflow-x-auto py-2">
      <li
        v-for="(season, index) in seasons"
        :key="index"
        :class="{ 'bg-primary text-white': activeSeason === season }"
        class="border border-primary text-primary flex rounded-lg shrink-0"
      >
        <button
          class="py-2 px-4 cursor-pointer"
          @click="emit('select', season)"
        >
          {{ season }}
        </button>
      </li>
    </ol>
  </div>
</template>
