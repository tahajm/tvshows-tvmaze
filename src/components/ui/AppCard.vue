<script setup lang="ts">
import ImagePlaceholder from '@/components/ui/ImagePlaceholder.vue';

defineProps<{
  image?: string | null;
  imageAlt?: string;
  title: string;
  subtitle?: string;
  size?: 'small' | 'large';
  hoverAnimation?: boolean;
}>();
</script>

<template>
  <div
    class="group card"
    :class="[`card--${size}`, { 'card--transformation': hoverAnimation }]"
  >
    <div class="overflow-hidden aspect-2/3">
      <img
        v-if="image"
        :src="image"
        :alt="imageAlt"
        loading="lazy"
        class="w-full h-full object-cover"
        :class="[{ 'image--transformation': hoverAnimation }]"
      />
      <ImagePlaceholder v-else />
    </div>
    <div class="p-3">
      <p class="font-semibold truncate" :title="title">{{ title }}</p>
      <slot name="subtitle">
        <p
          v-if="subtitle"
          class="text-sm text-gray-500 truncate"
          :title="subtitle"
        >
          {{ subtitle }}
        </p>
      </slot>
    </div>
    <div v-if="$slots.overlay" class="absolute top-1 right-1">
      <slot name="overlay" />
    </div>
  </div>
</template>

<style scoped>
@reference '@/style.css';

.card {
  @apply relative overflow-hidden bg-white flex flex-col;
}

.card--small {
  @apply rounded-2xl w-40 shrink-0 shadow-md max-h-60;
}

.card--large {
  @apply rounded-xl w-36 sm:w-44 md:w-52 shadow-lg mx-auto;
}

.card--transformation {
  @apply duration-300 hover:-translate-y-1 hover:shadow-2xl;
}

.image--transformation {
  @apply transition-transform duration-300 group-hover:scale-105;
}
</style>
