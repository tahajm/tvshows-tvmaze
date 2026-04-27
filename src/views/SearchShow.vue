<script setup lang="ts">
import AppLoading from '@/components/AppLoading.vue';
import SearchResultList from '@/components/SearchResultsList.vue';
import { useSearch } from '@/composables/useSearch';

const { searchTerm, data, isLoading, error, debouncedTerm } = useSearch();
</script>

<template>
  <main class="px-4 py-8">
    <div class="flex flex-col items-center">
      <label for="searchShows" class="text-2xl font-semibold mb-6"
        >Search TV Shows</label
      >
      <input
        v-model="searchTerm"
        id="searchShows"
        type="search"
        placeholder="Search for a show..."
        class="w-full max-w-2xl p-3 text-base border-2 border-primary rounded-xl placeholder:text-slate-400"
      />
    </div>

    <AppLoading v-if="isLoading" />
    <p v-else-if="error" role="alert" class="p-4 text-accent">
      Something went wrong. Please try again.
    </p>
    <SearchResultList
      v-else-if="debouncedTerm && data"
      :search-results="data"
    />
  </main>
</template>
