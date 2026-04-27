<script setup lang="ts">
defineProps<{ message?: string }>();
</script>
<template>
  <p role="alert" class="p-4 text-accent">
    {{ message ?? 'Something went wrong. Please try again.' }}
  </p>
</template>
