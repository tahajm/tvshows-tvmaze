const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://api.tvmaze.com';

export const API = {
  shows: `${BASE_URL}/shows`,
  show: (id: number | string) => `${BASE_URL}/shows/${id}`,
} as const;
