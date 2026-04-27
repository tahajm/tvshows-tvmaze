const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'https://api.tvmaze.com';

export const API = {
  shows: `${BASE_URL}/shows`,
  searchShows: (searchTerm: string) =>
    `${BASE_URL}/search/shows?q=${encodeURIComponent(searchTerm)}`,
  show: (id: number | string) =>
    `${BASE_URL}/shows/${encodeURIComponent(id)}?embed[]=images&embed[]=cast&embed[]=episodes`,
} as const;
