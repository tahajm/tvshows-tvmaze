<script setup lang="ts">
import { ref, onErrorCaptured, watch } from 'vue';
import { useRoute } from 'vue-router';

const error = ref<Error | null>(null);
const route = useRoute();

watch(
  () => route.path,
  () => {
    error.value = null;
  },
);

onErrorCaptured((err) => {
  console.error(err);
  error.value = err;
  return false;
});
</script>

<template>
  <slot v-if="!error" />
  <main
    v-else
    role="alert"
    class="px-4 py-24 flex flex-col items-center gap-4 text-center"
  >
    <p class="text-xl font-semibold">Something went wrong</p>
    <RouterLink to="/" class="px-6 py-3 rounded-xl bg-primary text-white">
      Back to home
    </RouterLink>
  </main>
</template>
