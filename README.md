# nuxt-template

A Nuxt 4 starter for building landings fast: **a page is a markdown file** that composes Nuxt UI
components, in English and Spanish. Plus Tailwind 4, Pinia, an awilix DI container for server routes,
and quality gates on commit and push.

The home page documents the template itself. Read [CLAUDE.md](./CLAUDE.md) for the conventions in
full.

## Adding a page

Create one markdown file per locale. That is the whole procedure — no `.vue` file, no route to
register, no config to edit.

```
content/en/pages/pricing.md   →  /pricing
content/es/pages/pricing.md   →  /es/pricing   (or /es/precios, see below)
```

A page is frontmatter for its metadata, then sections built from **Nuxt UI components**:

```md
---
title: Pricing
description: What it costs.
path: /pricing
---

::u-page-hero
---
headline: pricing
title: Simple pricing.
description: >-
  Prose that may safely contain a colon: like this one.
links:
  - label: Start now
    to: /signup
---
::
```

Sections are `::u-page-hero`, `::u-page-section` and `::u-page-cta`, and their bodies use Nuxt UI's
prose components: `::card-group` + `::card`, `::steps`, `::field-group` + `::field`, `::callout`,
`::code-group`. There is no wrapper layer to learn — the markdown speaks Nuxt UI directly, and the
padding, typography and alignment are standardised once in `app/app.config.ts`, so nothing in the
markdown carries a styling decision.

`path` is optional and lets you choose the URL per language: give the Spanish file `path: /precios`
and it is served at `/es/precios`, with the language switcher following along.

Two things to know before writing markdown: use `>-` for any prose in a YAML block, and never indent
the body of a component block. Both fail silently. The full set of rules is in
[CLAUDE.md](./CLAUDE.md).

## Getting started

```bash
pnpm install
pnpm dev
```

The dev server listens on **8000**, not 3000 — `.env` sets `PORT` and Nitro picks it up.

## Commands

```bash
pnpm dev              # dev server — http://localhost:8000
pnpm build            # production build (SSR)
pnpm preview          # serve the production build locally
pnpm generate         # static prerender into .output/public
pnpm lint             # eslint .
pnpm lint:fix         # eslint . --fix
pnpm typecheck        # vue-tsc --build --noEmit
pnpm typecheck:watch  # same, in watch mode
```

`pnpm lint` and `pnpm typecheck` run on `pre-push` and in CI. Running both before pushing is
the cheaper path.

## Languages

English is the default and lives at `/`. Spanish lives at `/es`. Both are prerendered, so both
are indexable.

- Page copy comes from `content/en/pages/` and `content/es/pages/`, with the frontmatter validated
  against the schema in `content.config.ts`.
- Interface strings — navigation, footer, aria-labels — come from `app/locales/en.json` and
  `app/locales/es.json`.

Adding a language means adding a locale in `nuxt.config.ts`, a JSON file in `app/locales/`, a
`content/<locale>/pages/` directory, and a collection in `content.config.ts`. Prerender routes are
derived from the content files, so those look after themselves.

## Environment

`.env.example` is the tracked contract. Every variable the app reads belongs there, and is
consumed through `runtimeConfig` in `nuxt.config.ts` rather than `process.env` in app code.

## Deploying to GitHub Pages

`pnpm generate` produces a fully static site in `.output/public`. The `github-pages` Nitro
preset adds `.nojekyll` and the `404.html` fallback.

For a **project site** served from a repository subpath:

```bash
NITRO_PRESET=github-pages NUXT_APP_BASE_URL=/<repository>/ pnpm generate
```

For a **user site or custom domain** served from the root, the base URL can be left alone:

```bash
NITRO_PRESET=github-pages pnpm generate
```

`NUXT_APP_BASE_URL` is Nuxt's own default source for `app.baseURL`, so nothing in
`nuxt.config.ts` needs to change — and `pnpm dev` keeps serving from the root.

Server routes under `server/` are not part of a static build. `pnpm build` and `pnpm preview`
still run the full SSR app, `/health` included.
