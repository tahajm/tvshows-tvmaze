import type { Show } from '@/types/shows';
import { stripHtml } from '@/utils/stripHtml';
import { computed } from 'vue';

export function useShowBanner(show: () => Show) {
  const backgroundImage = computed(() => {
    const background = show()._embedded?.images?.find(
      (image) => image.type === 'background',
    );
    return background ? background.resolutions.original.url : null;
  });

  const summary = computed(() =>
    show().summary ? stripHtml(show().summary!) : '',
  );

  return { backgroundImage, summary };
}
