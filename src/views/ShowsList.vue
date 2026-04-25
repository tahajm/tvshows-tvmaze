<script setup lang="ts">
import { useShows } from '@/composables/useShows';
import ShowCard from '@/components/ShowCard/ShowCard.vue';

const { isLoading, shows } = useShows();
</script>
<template>
  <main class="px-4 py-8">
    <h1 class="text-3xl font-semibold mb-6">TV Shows</h1>
    <section>
      <div v-if="isLoading">Loading...</div>
      <ol
        v-else
        class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4"
      >
        <li v-for="show in shows" :key="show.id">
          <ShowCard :show="show" />
        </li>
      </ol>
    </section>
  </main>
</template>
