<script setup lang="ts">
import RateBadge from '@/components/ui/RateBadge.vue';
import AppTag from '@/components/ui/AppTag.vue';
import AppCard from '@/components/ui/AppCard.vue';
import type { Show } from '@/types/shows';

const props = defineProps<{ show: Show }>();
</script>

<template>
  <RouterLink :to="`/show/${props.show.id}`">
    <AppCard
      :image="props.show.image?.medium"
      :imageAlt="props.show.name"
      :title="props.show.name"
      :hoverAnimation="true"
      size="large"
    >
      <template #subtitle>
        <div class="hidden sm:flex gap-1 flex-wrap mt-2">
          <AppTag :label="props.show.status" sr-prefix="Status: " />
          <AppTag :label="props.show.language" sr-prefix="Language: " />
        </div>
      </template>
      <template #overlay>
        <RateBadge :rate="props.show.rating.average" />
      </template>
    </AppCard>
  </RouterLink>
</template>
