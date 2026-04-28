# TV Shows

A TV show discovery app built with Vue 3 and TypeScript, using the [TVMaze public API](https://api.tvmaze.com).

## Requirements

- Node.js 20+
- npm

## Getting Started

```bash
npm install
npm run dev
```

| Command             | Description                                 |
| ------------------- | ------------------------------------------- |
| `npm run dev`       | Start dev server at `http://localhost:5173` |
| `npm run build`     | Type-check + production build               |
| `npm run preview`   | Preview production build                    |
| `npm run typecheck` | Type-check without building                 |
| `npm run lint`      | ESLint                                      |
| `npm run format`    | Prettier                                    |

## Stack

|              | Choice          | Reason                                                                                            |
| ------------ | --------------- | ------------------------------------------------------------------------------------------------- |
| Framework    | Vue 3           | Assignment requirement; `<script setup>` + Composition API gives clean, type-safe component logic |
| Language     | TypeScript      | Type safety across API responses, component props, and composables                                |
| Bundler      | Vite            | Fast HMR, native ESM, minimal config                                                              |
| Routing      | Vue Router 5    | Official router; route props keep components decoupled from routing                               |
| Styling      | Tailwind CSS v4 | Utility-first with custom design tokens; no runtime CSS-in-JS overhead                            |
| Data / Utils | VueUse          | Battle-tested reactive primitives (`useFetch`, `refDebounced`) — no need to reimplement           |

## Architecture

### Views stay thin

Views consume composables and handle UI state switching (`v-if/v-else-if` for loading / error / data). All business logic lives in composables.

### Composables

- `useShows` — fetches all shows, groups and sorts by genre and rating
- `useSearch` — owns debounced search state, fetch lifecycle, and error

### Data Fetching

VueUse’s `useFetch` is used throughout. Reactive URLs are passed as getter functions so VueUse tracks dependencies and refetches automatically. `immediate: false` + `watch` is used when fetches should not fire on mount (search).

### Routing

`ShowDetail` receives `id` via route props (`props: true`) rather than calling `useRoute()` inside the component, keeping it decoupled from the router.

### Generic Card

`AppCard` is shared between the show grid and cast list. Size variants (`small` / `large`) and an `hoverAnimation` prop handle visual differences. Slots (`#subtitle`, `#overlay`) handle content that varies per use case.

### Assumptions

**TVMaze API response ordering** — Episodes returned by `/shows/:id/episodes` are assumed to be already sorted by season and episode number in ascending order. The season selector in `ShowEpisodes.vue` preserves this natural ordering without applying a client-side sort.

### Error Handling

Recoverable errors (search, show detail) are shown inline near the UI that caused them. Loading states use `role="status"`, errors use `role="alert"`.

### Accessibility

- **Heading hierarchy** — single `<h1>` in the app header; views use `<h2>` onwards so the document outline is correct
- **Labelled inputs** — all form inputs have an associated `<label>` element; `placeholder` is not used as a substitute
- **Landmark regions** — `<header>`, `<main>`, `<nav>`, `<footer>`, and `<section>` with headings give screen reader users a navigable page structure
- **Live regions** — loading states use `role="status" aria-live="polite"` so they are announced without interrupting the user; errors use `role="alert"` for immediate announcement
- **Decorative content** — SVG icons that are already described by adjacent text carry `aria-hidden="true"` to avoid redundant announcements
- **Semantic lists** — show genres use `<ul>`, episode lists and search results use `<ol>` (ordered, since results have a meaningful rank/order)
- **Images** — all `<img>` elements have descriptive `alt` text; a styled `ImagePlaceholder` component is used when an image is unavailable, keeping layout consistent
