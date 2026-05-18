# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Next.js 15 static site (SSG) for **Piattaforma Notifiche (SEND)** — PagoPA's digital notifications service. The site includes a multilingual showcase, an interactive pickup-point locator with map, and a data-visualization dashboard ("SEND in numeri").

## Commands

```bash
# Install dependencies
yarn install

# Development (copy config first — required)
cp public/conf/config-dev.json public/conf/config.json
yarn dev          # http://localhost:3000

# Build (static export → build/)
yarn build

# Lint
yarn lint
```

Node.js LTS 18.9+ required. No test runner is configured.

## Configuration

Runtime config is loaded from `public/conf/config.json` at startup (not bundled at build time). For local dev, `config-dev.json` is the template. The `ConfigContext` (`src/context/config-context.tsx`) exposes typed values (API URLs, etc.) to the app.

The static export outputs to `build/` and is deployed on AWS CloudFront. Pickup-point CSV and data CSVs live on S3, not in git.

## Architecture

### Routing

All content pages are under `src/pages/[lang]/` — Next.js generates one static variant per supported language (`it`, `en`, `fr`, `de`, `sl`) via `getStaticPaths` + `getStaticProps`. The root `src/pages/index.tsx` redirects to `/{lang}` by reading sessionStorage (`"lang"`) then `navigator.language`, falling back to `"it"`.

### Internationalization

- Translation files: `public/locales/{lang}/{namespace}.json` (namespaces: `common`, `pickup`, `numeri`)
- Server-side: `getI18n(lang, namespaces)` (in `src/api/i18n.ts`) reads the JSON files at build time and passes them via `getStaticProps`
- Client-side: `LangProvider` (`src/context/lang-context.tsx`) holds the active language and translations; `useTranslation(namespaces)` returns a `t()` function for nested key lookup

### State Management

No Redux/Zustand. Two React Contexts cover global state:

| Context | What it holds |
|---|---|
| `LangContext` | language, translations, `changeLanguage` |
| `ConfigContext` | API URLs from `config.json` |

All other state is local `useState` inside components.

### Key Features

**Pickup-point map** (`src/pages/[lang]/mappa-punti-di-ritiro.tsx`):
- CSV loaded from S3 (or `/static/documents/radd-stores-registry.csv` for dev), parsed by Papa Parse into `RaddOperator[]`
- MapLibre GL + react-map-gl with clustering; marker states: base / selected / searched
- Address autocomplete via external geocoding API (configured in `config.json`)
- Responsive: mobile shows list/map tabs; desktop shows both panes

**Data dashboard** (`src/pages/[lang]/send-in-numeri-[id].tsx`):
- Vega-Lite specs built dynamically in `src/components/Numeri/shared/toVegaLiteSpec.ts`
- Chart types: line (trends), pie (distributions), KPI cards, geo choropleth
- CSV data files live in `src/components/Numeri/assets/data/`

### Path Alias

`@utils/*` resolves to `src/utils/*` (configured in `tsconfig.json`).

### Build Config

`next.config.js` notable settings:
- `output: "export"` — pure static, no server
- `.dev.tsx` file extension only included in dev builds
- `trailingSlash: true`
- `@pagopa/mui-italia` and `@mui/*` are transpiled/tree-shaken
