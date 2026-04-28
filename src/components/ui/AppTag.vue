<script setup lang="ts">
withDefaults(
  defineProps<{
    label: string | null | undefined;
    variant?: 'default' | 'primary';
    srPrefix?: string;
  }>(),
  {
    variant: 'default',
    srPrefix: undefined,
  },
);
</script>

<template>
  <span v-if="label" class="tag" :class="`tag--${variant}`">
    <span v-if="srPrefix" class="sr-only">{{ srPrefix }}</span>
    {{ label }}
  </span>
</template>

<style scoped>
@reference "@/style.css";

.tag {
  @apply inline-block text-xs px-2 py-0.5 rounded-md;
}

.tag--default {
  @apply text-gray-600 bg-gray-100;
}

.tag--primary {
  @apply text-primary bg-primary-surface;
}
</style>
