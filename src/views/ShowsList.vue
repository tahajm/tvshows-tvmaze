<script setup lang="ts">
import ShowCard from '@/components/ShowCard.vue';
import AppLoading from '@/components/ui/AppLoading.vue';
import ErrorMessage from '@/components/ui/ErrorMessage.vue';
import { useShows } from '@/composables/useShows';

const { isLoading, showsByGenre, error } = useShows();
</script>
<template>
  <main class="px-4 py-8">
    <AppLoading v-if="isLoading" />
    <ErrorMessage v-else-if="error" />
    <ul v-else>
      <li v-for="(shows, genre) in showsByGenre" :key="genre" class="py-8">
        <h2 class="py-4 font-bold text-2xl">{{ genre }}</h2>
        <ol class="flex py-4 gap-4 overflow-x-auto snap-x">
          <li v-for="show in shows" :key="show.id" class="snap-start">
            <ShowCard :show="show" />
          </li>
        </ol>
      </li>
    </ul>
  </main>
</template>
