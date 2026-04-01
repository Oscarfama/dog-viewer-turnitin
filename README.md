# 🐶 Dog Viewer

## Tech stack

| Concern | Choice |
|---|---|
| Framework | **Angular 20** (standalone components, no NgModules) |
| Language | **TypeScript** (strict mode) |
| State | **Angular Signals** (`signal`, `computed`) |
| Styling | **SCSS** with CSS custom properties |
| HTTP | `HttpClient` + RxJS |
| Testing | **Karma + Jasmine** |
| Data | [Dog CEO API](https://dog.ceo/dog-api/) |

---

## Getting started

### Prerequisites

- Node.js ≥ 18

### Install & run

```bash
npm install
npm start
```

Open **http://localhost:4200** in your browser.

### Run tests

```bash
npm test
```

---

## Architecture decisions

### Signal-based state
`DogStateService` owns all application state as signals:

```
mainImage   — the currently displayed dog
thumbnails  — the 10 thumbnail dogs
favorites   — persisted list of saved dogs
loadingState — 'idle' | 'loading' | 'success' | 'error'
```
### Separation of concerns
```
core/services/
  dog-api.service.ts    — pure HTTP, no state
  dog-state.service.ts  — signal state + business logic

features/dog-viewer/
  dog-viewer.component  — page-level orchestrator (thin)
  components/
    main-image/         — hero display + favorite/shuffle buttons
    thumbnail-grid/     — grid layout + delegates to thumbnail-card
    thumbnail-card/     — single card with hover/active states
    favorites-panel/    — sidebar list with remove actions
```

### Accessibility
- All interactive elements have descriptive `aria-label` attributes.
- Favourite button uses `aria-pressed` to convey toggle state to screen readers.
- Loading and error regions use `role="status"` / `role="alert"`.
- Colour contrast ratios meet WCAG AA throughout.
- Semantic HTML: `<header>`, `<main>`, `<aside>`, `<section>`, `<article>`, `<ul role="list">`.

### Performance
- `ChangeDetectionStrategy.OnPush` on every component.
- Thumbnail images use `loading="lazy"` — images only download when they enter the viewport, reducing initial page load time and bandwidth.
- A single API call (`/breeds/image/random/11`) fetches all images in parallel on startup.
- Favourites are persisted to `localStorage` to avoid re-fetching.

