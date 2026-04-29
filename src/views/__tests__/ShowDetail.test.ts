import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { type Ref, ref } from 'vue';

import AppLoading from '@/components/ui/AppLoading.vue';
import ErrorMessage from '@/components/ui/ErrorMessage.vue';

import ShowDetail from '../ShowDetail.vue';

const isLoading: Ref<boolean> = ref(false);
const error: Ref<unknown> = ref(null);
const data: Ref<unknown> = ref(null);

vi.mock('@vueuse/core', () => ({
  useFetch: vi.fn(() => ({
    json: () => ({ data, isFetching: isLoading, error }),
  })),
  useTitle: vi.fn(),
}));

const mockShow = {
  id: 1,
  name: 'Breaking Bad',
  rating: { average: 9.5 },
  genres: ['Drama'],
  status: 'Ended',
  language: 'English',
  summary: '<p>A chemistry teacher turns drug lord.</p>',
  network: null,
  averageRuntime: 47,
  image: { original: 'https://example.com/o.jpg' },
  _embedded: { cast: [], episodes: [] },
};

const mountOptions = {
  props: { id: '1' },
  global: { stubs: { RouterLink: true } },
};

describe('ShowDetail', () => {
  beforeEach(() => {
    isLoading.value = false;
    error.value = null;
    data.value = null;
  });

  it('shows AppLoading when loading', () => {
    isLoading.value = true;
    const wrapper = mount(ShowDetail, mountOptions);
    expect(wrapper.findComponent(AppLoading).exists()).toBe(true);
  });

  it('shows ErrorMessage on error', () => {
    error.value = new Error('Network error');
    const wrapper = mount(ShowDetail, mountOptions);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
  });

  it('shows show content when data is loaded', () => {
    data.value = mockShow;
    const wrapper = mount(ShowDetail, mountOptions);
    expect(wrapper.find('h2').text()).toBe('Breaking Bad');
    expect(wrapper.find(`img[src="${mockShow.image.original}"]`).exists()).toBe(
      true,
    );
  });
});
