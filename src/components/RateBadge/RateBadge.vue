<script setup lang="ts">
import StarIcon from '../icons/StarIcon.vue';
const props = defineProps<{ rate: number | null }>();
</script>
<template>
  <div
    class="w-fit flex items-center gap-1 bg-black/50 text-white text-xs px-1.5 py-0.5 rounded"
    aria-label="show rating"
  >
    <span v-if="props.rate !== null">
      {{ props.rate }}
    </span>
    <span v-else aria-label="Rating Is Not Available">-</span>
    <StarIcon />
  </div>
</template>
