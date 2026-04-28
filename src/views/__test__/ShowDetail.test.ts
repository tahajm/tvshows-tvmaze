import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref, type Ref } from 'vue';
import ShowDetail from '../ShowDetail.vue';
import AppLoading from '@/components/ui/AppLoading.vue';
import ErrorMessage from '@/components/ui/ErrorMessage.vue';
import ShowBanner from '@/components/ShowBanner.vue';
import CastList from '@/components/CastList.vue';
import EpisodeList from '@/components/EpisodeList.vue';

const isLoading: Ref<boolean> = ref(false);
const error: Ref<unknown> = ref(null);
const data: Ref<unknown> = ref(null);

vi.mock('@vueuse/core', () => ({
  useFetch: vi.fn(() => ({
    json: () => ({ data, isFetching: isLoading, error }),
  })),
}));

const mockShow = {
  id: 1,
  name: 'Breaking Bad',
  rating: { average: 9.5 },
  image: { medium: '', original: '' },
  genres: ['Drama'],
  status: 'Ended',
  language: 'English',
  summary: '<p>A chemistry teacher turns drug lord.</p>',
  network: null,
  averageRuntime: 47,
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
    expect(wrapper.findComponent(ShowBanner).exists()).toBe(true);
    expect(wrapper.findComponent(CastList).exists()).toBe(true);
    expect(wrapper.findComponent(EpisodeList).exists()).toBe(true);
  });

  it('shows nothing when data is null and not loading', () => {
    const wrapper = mount(ShowDetail, mountOptions);
    expect(wrapper.findComponent(AppLoading).exists()).toBe(false);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
    expect(wrapper.findComponent(ShowBanner).exists()).toBe(false);
  });
});
