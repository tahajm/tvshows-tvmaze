<script setup lang="ts">
import AppFooter from '@/components/ui/AppFooter.vue';
import AppHeader from '@/components/ui/AppHeader.vue';
import ErrorBoundary from '@/components/ui/ErrorBoundary.vue';
</script>

<template>
  <AppHeader />
  <ErrorBoundary>
    <RouterView />
  </ErrorBoundary>
  <AppFooter />
</template>
