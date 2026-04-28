<script setup lang="ts">
import { RouterLink } from 'vue-router';

import TVIcon from '@/components/ui/icons/TVIcon.vue';
</script>
<template>
  <header class="bg-primary shadow-lg flex p-4 items-center justify-between">
    <div class="flex gap-2 items-center text-white">
      <TVIcon />
      <h1 class="text-xl font-bold">TV Shows</h1>
    </div>
    <nav class="flex items-center gap-1">
      <RouterLink to="/" class="nav-link" exact-active-class="nav-link--active">
        Home
      </RouterLink>
      <RouterLink
        to="/search"
        class="nav-link"
        exact-active-class="nav-link--active"
      >
        Search
      </RouterLink>
    </nav>
  </header>
</template>

<style scoped>
@reference "@/style.css";

.nav-link {
  @apply px-4 py-1.5 rounded-full text-sm font-medium text-white/90 hover:text-white transition-colors;
}

.nav-link--active {
  @apply bg-primary-dark text-white;
}
</style>
