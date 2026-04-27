import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref, type Ref } from 'vue';
import type { Show } from '@/types/shows';
import ShowsList from './ShowsList.vue';
import AppLoading from '@/components/ui/AppLoading.vue';
import ErrorMessage from '@/components/ui/ErrorMessage.vue';

const isLoading: Ref<boolean> = ref(false);
const error: Ref<unknown> = ref(null);
const showsByGenre: Ref<Record<string, Partial<Show>[]>> = ref({
  Drama: [{ id: 1, name: 'Breaking Bad' }],
  Crime: [{ id: 2, name: 'The Wire' }],
});

vi.mock('@/composables/useShows', () => ({
  useShows: () => ({ isLoading, showsByGenre, error }),
}));

const mountOptions = { global: { stubs: { RouterLink: true } } };

describe('ShowsList', () => {
  beforeEach(() => {
    isLoading.value = false;
    error.value = null;
    showsByGenre.value = {
      Drama: [{ id: 1, name: 'Breaking Bad' }],
      Crime: [{ id: 2, name: 'The Wire' }],
    };
  });

  it('shows AppLoading when loading', () => {
    isLoading.value = true;
    const wrapper = mount(ShowsList, mountOptions);
    expect(wrapper.findComponent(AppLoading).exists()).toBe(true);
  });

  it('shows ErrorMessage on error', () => {
    error.value = new Error('Network error');
    const wrapper = mount(ShowsList, mountOptions);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
  });

  it('renders a section per genre', () => {
    const wrapper = mount(ShowsList, mountOptions);
    const headings = wrapper.findAll('h2');
    expect(headings).toHaveLength(2);
    expect(headings[0].text()).toBe('Drama');
    expect(headings[1].text()).toBe('Crime');
  });

  it('renders no genre sections when data is empty', () => {
    showsByGenre.value = {};
    const wrapper = mount(ShowsList, mountOptions);
    expect(wrapper.findAll('h2')).toHaveLength(0);
  });
});
