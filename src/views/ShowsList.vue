<script setup lang="ts">
import ShowCard from '@/components/ShowCard.vue';
import { useShows } from '@/composables/useShows';

const { isLoading, showsByGenre } = useShows();
</script>
<template>
  <main class="px-4 py-8">
    <h1 class="text-3xl font-semibold mb-6">TV Shows</h1>
    <section>
      <div v-if="isLoading">Loading...</div>
      <ul v-else>
        <li class="py-8" v-for="(shows, genre) in showsByGenre" :key="genre">
          <h1 class="py-4 font-bold text-2xl">{{ genre }}</h1>
          <ol class="flex py-4 gap-4 overflow-x-auto snap-x">
            <li v-for="show in shows" :key="show.id" class="snap-start">
              <ShowCard :show="show" />
            </li>
          </ol>
        </li>
      </ul>
    </section>
  </main>
</template>
