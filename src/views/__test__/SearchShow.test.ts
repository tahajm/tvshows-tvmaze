import { describe, it, expect, vi, beforeEach } from 'vitest';
import { mount } from '@vue/test-utils';
import { ref, type Ref } from 'vue';
import SearchShow from '../SearchShow.vue';
import AppLoading from '@/components/ui/AppLoading.vue';
import ErrorMessage from '@/components/ui/ErrorMessage.vue';
import SearchResultList from '@/components/SearchResultsList.vue';

const isLoading: Ref<boolean> = ref(false);
const error: Ref<unknown> = ref(null);
const data: Ref<unknown> = ref(null);
const debouncedTerm: Ref<string> = ref('');
const searchTerm: Ref<string> = ref('');

vi.mock('@/composables/useSearch', () => ({
  useSearch: () => ({ searchTerm, debouncedTerm, data, isLoading, error }),
}));

const mountOptions = { global: { stubs: { RouterLink: true } } };

describe('SearchShow', () => {
  beforeEach(() => {
    isLoading.value = false;
    error.value = null;
    data.value = null;
    debouncedTerm.value = '';
    searchTerm.value = '';
  });

  it('renders the search label and input', () => {
    const wrapper = mount(SearchShow, mountOptions);
    expect(wrapper.find('label').text()).toBe('Search TV Shows');
    expect(wrapper.find('input[type="search"]').exists()).toBe(true);
  });

  it('shows AppLoading when loading', () => {
    isLoading.value = true;
    const wrapper = mount(SearchShow, mountOptions);
    expect(wrapper.findComponent(AppLoading).exists()).toBe(true);
  });

  it('shows ErrorMessage on error', () => {
    error.value = new Error('Network error');
    const wrapper = mount(SearchShow, mountOptions);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(true);
  });

  it('shows SearchResultList when debounced term and data are present', () => {
    debouncedTerm.value = 'Breaking Bad';
    data.value = [{ show: { id: 1, name: 'Breaking Bad' } }];
    const wrapper = mount(SearchShow, mountOptions);
    expect(wrapper.findComponent(SearchResultList).exists()).toBe(true);
  });

  it('shows nothing when search is empty', () => {
    const wrapper = mount(SearchShow, mountOptions);
    expect(wrapper.findComponent(AppLoading).exists()).toBe(false);
    expect(wrapper.findComponent(ErrorMessage).exists()).toBe(false);
    expect(wrapper.findComponent(SearchResultList).exists()).toBe(false);
  });
});
