<script setup lang="ts">
import { useTitle } from '@vueuse/core';

import { APP_NAME } from '@/config/app';

useTitle(`404 Not Found — ${APP_NAME}`);
</script>

<template>
  <main
    class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 flex flex-col items-center gap-6 text-center"
  >
    <h2 class="text-2xl font-semibold">404 Page not found</h2>
    <RouterLink
      to="/"
      class="mt-2 px-6 py-2.5 rounded-xl bg-primary text-white"
    >
      Back to home
    </RouterLink>
  </main>
</template>
