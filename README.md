# nuxt-template

A Nuxt 4 starter with the decisions already made: two languages, page copy in Nuxt Content,
Nuxt UI 4 with Tailwind 4, Pinia, an awilix DI container for server routes, and quality gates
on commit and push.

The home page documents the template itself, in English and Spanish. Read
[CLAUDE.md](./CLAUDE.md) for the conventions in full.

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

- Section copy comes from `content/en/index.yml` and `content/es/index.yml`, validated against
  the schema in `content.config.ts`.
- Interface strings — navigation, footer, aria-labels — come from `app/locales/en.json` and
  `app/locales/es.json`.

Adding a language means adding a locale in `nuxt.config.ts`, a JSON file in `app/locales/`, a
directory under `content/`, a collection pair in `content.config.ts`, and its route to
`nitro.prerender.routes`.

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
