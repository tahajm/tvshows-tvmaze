<script setup lang="ts">
import { useFetch } from '@/composables/useFetch';
import { API } from '@/config/api';
import type { Show } from '@/types/shows';
import { useRoute } from 'vue-router';
import ShowBanner from '@/components/ShowBanner.vue';
import ShowEpisodes from '@/components/ShowEpisodes.vue';
import CastList from '@/components/CastList.vue';

const route = useRoute();
const { id } = route.params;
const { data: showDetail, isLoading } = useFetch<Show>(API.show(id));
</script>
<template>
  <p v-if="isLoading" role="status" aria-live="polite">Loading...</p>
  <main v-else-if="showDetail">
    <ShowBanner :show="showDetail" />
    <section aria-labelledby="cast-heading" class="p-4">
      <h2 id="cast-heading" class="text-3xl font-semibold">Cast</h2>
      <CastList :cast-list="showDetail._embedded?.cast" />
    </section>

    <section aria-labelledby="episodes-heading" class="p-4 mt-4">
      <h2 id="episodes-heading" class="text-3xl font-semibold mb-6">
        Episodes
      </h2>
      <ShowEpisodes :episodes="showDetail._embedded?.episodes" />
    </section>
  </main>
</template>
