<script setup lang="ts">
import AppLoading from '@/components/ui/AppLoading.vue';
import SearchResultList from '@/components/SearchResultsList.vue';
import ErrorMessage from '@/components/ui/ErrorMessage.vue';
import { useSearch } from '@/composables/useSearch';

const { searchTerm, data, isLoading, error, debouncedTerm } = useSearch();
</script>

<template>
  <main class="px-4 py-8">
    <div class="flex flex-col items-center">
      <label
        for="searchShows"
        class="flex flex-col w-full max-w-2xl text-2xl mb-6"
      >
        <span class="mb-6">Search TV Shows</span>
        <input
          v-model="searchTerm"
          id="searchShows"
          type="search"
          placeholder="Search for a show..."
          class="w-full p-3 text-base border-2 border-primary rounded-xl placeholder:text-slate-400"
        />
      </label>
    </div>

    <AppLoading v-if="isLoading" />
    <ErrorMessage v-else-if="error" />
    <SearchResultList
      v-else-if="debouncedTerm && data"
      :search-results="data"
    />
  </main>
</template>
