# nuxt-template

Base template for starting Nuxt 4 projects. Clone it, rename the project, and build on top of the conventions it already wires up.

## Stack

| Piece | Version | Notes |
| --- | --- | --- |
| [Nuxt](https://nuxt.com) | 4.5 | `srcDir` is `app/`, no `server/` yet |
| [Nuxt UI](https://ui.nuxt.com) | 4.10 | `U*` components, theme in `app/app.config.ts` |
| [Tailwind CSS](https://tailwindcss.com) | 4.3 | no JS config: tokens live in `@theme` inside `app/assets/css/main.css` |
| [Pinia](https://pinia.vuejs.org) | 4.0 | stores in `app/stores/*.store.ts` |
| ESLint | 10 | `@nuxt/eslint-config` with `stylistic` — formats without Prettier |
| TypeScript | 5.9 | typechecked with `vue-tsc` |

## Requirements

- Node `^22.19.0 || ^24.11.0 || >=26.0.0` (what Nuxt 4.5 requires)
- pnpm (the repo uses `pnpm-lock.yaml`)

## Getting started

```bash
pnpm install
cp .env.example .env
pnpm dev
```

The dev server runs at **http://localhost:8000**

## Scripts

```bash
pnpm dev              # development server
pnpm build            # production build
pnpm preview          # serve the production build locally
pnpm generate         # static prerender
pnpm lint             # eslint .
pnpm lint:fix         # eslint . --fix
pnpm typecheck        # vue-tsc --build --noEmit
pnpm typecheck:watch  # same, in watch mode
```

No test framework is installed yet.

**Environment variables.** Declared in `.env.example` (which is tracked) and read through `runtimeConfig` in `nuxt.config.ts`, not via `process.env` from app code.

## Documentation

- [Nuxt](https://nuxt.com/docs/getting-started/introduction) · [deployment](https://nuxt.com/docs/getting-started/deployment)
- [Nuxt UI](https://ui.nuxt.com/getting-started)
- [Tailwind CSS v4](https://tailwindcss.com/docs)
