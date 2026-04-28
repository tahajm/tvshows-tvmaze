<script setup lang="ts">
import { useFetch, useTitle } from '@vueuse/core';
import { computed } from 'vue';

import CastList from '@/components/CastList.vue';
import EpisodeList from '@/components/EpisodeList.vue';
import ShowBanner from '@/components/ShowBanner.vue';
import AppLoading from '@/components/ui/AppLoading.vue';
import ErrorMessage from '@/components/ui/ErrorMessage.vue';
import { API } from '@/config/api';
import type { Show } from '@/types/shows';

const props = defineProps<{ id: string }>();
const {
  data: showDetail,
  isFetching: isLoading,
  error,
} = useFetch<Show>(() => API.show(props.id), { refetch: true }).json();

const viewTitle = computed(() => {
  if (showDetail.value) return `${showDetail.value.name} - TV Shows`;
  return 'TV Shows';
});
useTitle(viewTitle);
</script>

<template>
  <AppLoading v-if="isLoading" />
  <ErrorMessage v-else-if="error" />

  <main v-else-if="showDetail">
    <ShowBanner :show="showDetail" />
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h2 class="text-3xl font-semibold">Cast</h2>
      <CastList :cast-list="showDetail._embedded?.cast" />
    </section>

    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h2 class="text-3xl font-semibold mb-6">Episodes</h2>
      <EpisodeList :episodes="showDetail._embedded?.episodes" />
    </section>
  </main>
</template>
