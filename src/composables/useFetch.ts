import { ref } from 'vue';

export function useFetch<T>(url: string) {
  const isLoading = ref(false);
  const data = ref<T | null>(null);
  const error = ref<string | null>(null);

  const execute = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(
          `Request Failed ${response.status} ${response.statusText}`,
        );
      }

      data.value = await response.json();
    } catch (e) {
      error.value = e instanceof Error ? e.message : 'Request Failed';
    } finally {
      isLoading.value = false;
    }
  };

  execute();

  return {
    isLoading,
    data,
    error,
  };
}
