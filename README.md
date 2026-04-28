# TV Shows

A TV show discovery SPA built with Vue 3 and TypeScript, powered by the [TVMaze public API](https://api.tvmaze.com).

## Requirements

- Node.js 22+ (see `.nvmrc`)
- pnpm 10+

## Getting Started

```bash
cp .env.example .env
pnpm install
pnpm dev
```

The app runs at `http://localhost:5173` by default. No account or API key is required — TVMaze is a free public API.

## Environment Variables

| Variable            | Default                  | Description         |
| ------------------- | ------------------------ | ------------------- |
| `VITE_API_BASE_URL` | `https://api.tvmaze.com` | TVMaze API base URL |

Copy `.env.example` to `.env` to override. The app falls back to the default if the variable is absent, so this step is optional for local development.

## Commands

| Command          | Description                                 |
| ---------------- | ------------------------------------------- |
| `pnpm dev`       | Start dev server at `http://localhost:5173` |
| `pnpm build`     | Type-check + production build               |
| `pnpm preview`   | Preview production build                    |
| `pnpm typecheck` | Type-check without building                 |
| `pnpm lint`      | ESLint                                      |
| `pnpm format`    | Prettier (write)                            |
| `pnpm test`      | Vitest (watch mode)                         |

## Stack

|              | Choice          | Reason                                                                                              |
| ------------ | --------------- | --------------------------------------------------------------------------------------------------- |
| Framework    | Vue 3           | Assignment requirement; `<script setup>` + Composition API gives clean, type-safe component logic   |
| Language     | TypeScript      | Type safety across API responses, component props, and composables                                  |
| Bundler      | Vite            | Fast HMR, native ESM, minimal config                                                                |
| Routing      | Vue Router 5    | Official router; route props keep components decoupled from routing                                 |
| Styling      | Tailwind CSS v4 | Utility-first with custom design tokens; no runtime CSS-in-JS overhead                              |
| Data / Utils | VueUse          | Battle-tested reactive primitives (`useFetch`, `refDebounced`, `useTitle`) — no need to reimplement |

## Project Structure

```
src/
├── components/
│   ├── ui/
│   │   ├── icons/
│   │   ├── AppCard.vue
│   │   ├── AppHeader.vue
│   │   ├── AppFooter.vue
│   │   ├── AppLoading.vue
│   │   ├── AppTag.vue
│   │   ├── ErrorBoundary.vue
│   │   ├── ErrorMessage.vue
│   │   ├── ImagePlaceholder.vue
│   │   └── RateBadge.vue
│   ├── CastList.vue
│   ├── EpisodeList.vue
│   ├── EpisodeListItem.vue
│   ├── EpisodeListSeason.vue
│   ├── SearchResultsList.vue
│   ├── ShowBanner.vue
│   ├── ShowBannerContent.vue
│   └── ShowCard.vue
├── composables/
│   ├── useSearch.ts
│   └── useShows.ts
├── config/
│   └── api.ts
├── router/
│   └── index.ts
├── types/
│   └── shows.ts
├── utils/
│   ├── formatDate.ts
│   └── stripHtml.ts
├── views/
│   ├── NotFound.vue
│   ├── SearchShow.vue
│   ├── ShowDetail.vue
│   └── ShowsList.vue
├── App.vue
├── main.ts
└── style.css
```

As the project grows, the preference is to move towards a **module structure** where each module owns its components, composable, types, and tests in one folder:
This keeps related code co-located and makes it easier to reason about, test, and eventually extract features.

## Architecture

### Views stay thin

Views consume composables and handle UI state switching (`v-if/v-else-if` for loading / error / data). No business logic lives in views.

### Composables

Located in `src/composables/`:

- `useShows` — fetches all shows, groups and sorts by genre/rating via a single `computed`
- `useSearch` — owns debounced search state (`refDebounced`, 300 ms), fetch lifecycle, and error; clears stale results when the input is emptied

### Data Fetching

VueUse's `useFetch` is used throughout. Reactive URLs are passed as getter functions (`() => url`) so VueUse tracks dependencies and refetches automatically. `immediate: false` + `watch` is used when a fetch should not fire on mount (search).

### Routing

`ShowDetail` receives `id` via route props (`props: true`) rather than calling `useRoute()` inside the component, keeping it decoupled from the router. The URL is passed to `useFetch` as a getter so the fetch re-fires when `id` changes without remounting the component.

### API config

`src/config/api.ts` is the single source of truth for all endpoint URLs. No URLs are inlined in components or composables.

### Generic Card

`AppCard` is shared between the show grid and cast list. Size variants (`small` / `large`) and a `hoverAnimation` prop handle visual differences. Slots (`#subtitle`, `#overlay`) handle content that varies per use case without prop explosion.

### Styling

Tailwind CSS v4 with `@theme static` custom design tokens defined in `src/style.css`:

| Token                     | Value        | Usage                        |
| ------------------------- | ------------ | ---------------------------- |
| `--color-primary`         | `#7c3aed`    | Brand / interactive elements |
| `--color-primary-dark`    | `#6d28d9`    | Hover / active states        |
| `--color-primary-surface` | light purple | Tag backgrounds              |
| `--color-accent`          | `#dc2626`    | Error states                 |
| `--color-rating`          | `#d97706`    | Rating badge                 |

### Error Handling

Two-tier strategy: `ErrorBoundary` at the App level catches unexpected thrown errors; inline `ErrorMessage` components handle recoverable per-view fetch errors. Loading states use `role="status"`, errors use `role="alert"`.

### Accessibility

- **Heading hierarchy** — single `<h1>` in the app header; views use `<h2>` onwards
- **Landmark regions** — `<header>`, `<main>`, `<nav>`, `<footer>`, `<section>` with headings give screen reader users a navigable page structure
- **Labelled inputs** — all form inputs have an associated `<label>`; `placeholder` is never used as a substitute
- **Live regions** — loading states use `role="status" aria-live="polite"`; errors use `role="alert"`
- **Decorative SVGs** — carry `aria-hidden="true"` to avoid redundant announcements
- **Semantic lists** — show genres use `<ul>`; episode lists and search results use `<ol>` (ordered, results have a meaningful rank)
- **Images** — all `<img>` elements have descriptive `alt` text; `ImagePlaceholder` is shown when an image is unavailable
- **Dynamic titles** — `useTitle` updates `document.title` on every route change for screen reader announcement

### Assumptions

**TVMaze episode ordering** — Episodes returned by `/shows/:id/episodes` are assumed to be already sorted by season and episode number. The season selector preserves this natural ordering without a client-side sort.

**Ratings** — Shows with `rating.average === null` are treated the same as `0` and sorted to the bottom of each genre group.

## Tooling

| Tool        | Purpose                                                                                |
| ----------- | -------------------------------------------------------------------------------------- |
| ESLint      | Linting (`eslint-plugin-vue`, `vuejs-accessibility`, `simple-import-sort`, TypeScript) |
| Prettier    | Formatting                                                                             |
| Husky       | Git hooks                                                                              |
| lint-staged | Runs ESLint + Prettier on staged files pre-commit                                      |
| Vitest      | Unit tests with `happy-dom`                                                            |

## To Improve

Items intentionally deferred — known trade-offs for the scope of this assignment:

- **URL-bound search state** — search term is local component state; refreshing or sharing a search URL loses context. Fix: `useRouteQuery('q')` from VueUse.
- **Skeleton loading** — the spinner gives no layout preview. Skeleton blocks in `ShowsList` and `ShowDetail` would improve perceived performance.
- **Pagination / virtualisation** — `/shows` returns ~240 records rendered all at once. TVMaze supports `?page=`; alternatively, virtualise the horizontal lists.
- **Prefetching** — hovering a show card could prefetch `API.show(id)` for near-instant navigation.
- **Search filters** — no genre filter or sort-by-rating on the search page.
- **No e2e tests** — a single Playwright happy-path script (home → show detail → search) would round out the testing story.
- **Coverage reporting** — `@vitest/coverage-v8` and a `test:coverage` script are not wired up.
