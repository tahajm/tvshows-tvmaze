export async function getShowsFromApi() {
  const response = await fetch('https://api.tvmaze.com/shows');

  if (!response.ok) {
    throw new Error(
      `Failed to fetch shows ${response.status} ${response.statusText}`,
    );
  }

  return response.json();
}
