<script setup lang="ts">
import AppHeader from '@/components/AppHeader.vue';
import AppFooter from '@/components/AppFooter.vue';
import ErrorBoundary from '@/components/ErrorBoundary.vue';
</script>

<template>
  <AppHeader />
  <ErrorBoundary>
    <RouterView />
  </ErrorBoundary>
  <AppFooter />
</template>
