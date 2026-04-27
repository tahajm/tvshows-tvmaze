<script setup lang="ts">
import { useFetch } from '@vueuse/core';
import { API } from '@/config/api';
import type { Show } from '@/types/shows';
import ShowBanner from '@/components/ShowBanner.vue';
import ShowEpisodes from '@/components/ShowEpisodes.vue';
import CastList from '@/components/CastList.vue';

const props = defineProps<{ id: string }>();
const { data: showDetail, isFetching: isLoading } = useFetch<Show>(
  API.show(props.id),
).json();
</script>

<template>
  <p v-if="isLoading" role="status" aria-live="polite">Loading...</p>
  <main v-else-if="showDetail">
    <ShowBanner :show="showDetail" />
    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h2 class="text-3xl font-semibold">Cast</h2>
      <CastList :cast-list="showDetail._embedded?.cast" />
    </section>

    <section class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
      <h2 class="text-3xl font-semibold mb-6">Episodes</h2>
      <ShowEpisodes :episodes="showDetail._embedded?.episodes" />
    </section>
  </main>
</template>
