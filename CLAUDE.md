# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A reusable Nuxt 4 starter template, cloned as the base for new projects. It ships one page — a
bilingual home that documents the template itself — plus the conventions that page demonstrates:
view/container/presentational components, page copy in Nuxt Content, interface strings in i18n JSON,
and an empty placeholder store in `app/stores/app.store.ts`.

Treat the existing files as the conventions to follow and extend, not as an app to refactor. When adding something here, ask whether every future project cloned from this template wants it.

The home page is also documentation: it names real paths and real commands. If you change a
convention, the copy in `content/en/index.yml` and `content/es/index.yml` has to change with it, or
the page starts lying.

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`, `pnpm-workspace.yaml`).

```bash
pnpm dev              # dev server — http://localhost:8000, not 3000 (see Environment)
pnpm build            # production build (SSR, server/ included)
pnpm preview          # serve the production build locally
pnpm generate         # static prerender into .output/public (see Static builds)
pnpm lint             # eslint .
pnpm lint:fix         # eslint . --fix
pnpm typecheck        # vue-tsc --build --noEmit
pnpm typecheck:watch  # same, in watch mode
```

Run `pnpm lint` and `pnpm typecheck` before considering a change done. There is no test framework installed; don't invent test commands.

After installing a module or touching `nuxt.config.ts`, run `pnpm postinstall` (`nuxt prepare`)
before `pnpm typecheck` — otherwise `.nuxt` types are stale and typecheck reports missing
auto-imports that in fact exist.

## Quality gates

`.husky/pre-push` runs `pnpm lint` and then `pnpm typecheck`, so a push fails if either does — running both yourself first is the cheaper path. `.husky/commit-msg` runs commitlint, so a commit is rejected outright if its message doesn't parse.

Husky executes hook files with `sh -e`, so each check goes on its own line and the hook aborts at the first non-zero exit. Adding a gate means appending a line, not extending an `&&` chain.

`.github/workflows/ci.yml` runs on pull requests to `main`: `quality` (lint, then typecheck) first, then `build`, which declares `needs: quality` and is skipped if quality fails. `build` runs `pnpm build` and then `pnpm generate` with `NITRO_PRESET=github-pages`, so the template can't lose static compatibility without CI noticing. Both use `pnpm/setup@v2`, which installs pnpm, installs Node and runs `pnpm install` in one step, reading the versions from `packageManager` and `devEngines.runtime` in `package.json` — that's where a Node or pnpm version bump goes, not in the workflow.

The `concurrency` group keys on the pull request number, so pushing again cancels the run still in flight rather than queueing a second one.

Job ids stay plain (`quality`, `build`) because they are what a branch-protection ruleset references; the emoji live on step names only.

Commit messages are validated against `@commitlint/config-conventional` with no overrides — the config is the `commitlint` field in `package.json`, not a separate file. The defaults apply: the eleven standard types, header ≤100 chars, lowercase subject with no trailing period. Merge commits are skipped by commitlint's default ignores.

The hooks are installed by the `prepare` script, which coexists with the existing `postinstall: nuxt prepare`. CI sets `HUSKY: 0` so the runner doesn't install hooks.

## Environment

`.env` sets `PORT=8000`, which Nitro picks up automatically — the dev server and preview both listen on **8000**. The README still says 3000 (it is the untouched Nuxt scaffold README); the `.env` wins.

`.env.example` is the tracked contract for env vars. Any new variable read by the app must be added there, and consumed through `runtimeConfig` in `nuxt.config.ts` rather than `process.env` in app code. `runtimeConfig.public` currently carries `version` (read from `package.json`), `repositoryUrl` and the i18n `baseUrl`.

Build-time-only variables stay out of `.env.example` — they belong to a command, not to the running app. See Static builds.

## Static builds

Both targets are supported: `pnpm build` for SSR (with `server/`), `pnpm generate` for a static site.

`nitro.prerender` lists `/` and `/es` explicitly on top of `crawlLinks`, so a second language never depends on the crawler finding a link to it. Adding a locale means adding its route here.

`app.baseURL` is deliberately absent from `nuxt.config.ts`: Nuxt already defaults it to `NUXT_APP_BASE_URL`, so dev keeps serving from the root and a subpath deploy is a variable on the command:

```bash
NITRO_PRESET=github-pages NUXT_APP_BASE_URL=/nuxt-template/ pnpm generate
```

The `github-pages` Nitro preset writes `.nojekyll` and `404.html` itself — don't hand-roll them.

`server/` is not part of a static build. Don't justify removing a server route by appealing to `generate`; verify SSR with `pnpm build && pnpm preview` instead.

## Architecture

Nuxt 4 with `srcDir` defaulting to `app/`. `server/` holds Nitro routes with a hexagonal layout and an awilix container; it participates in `pnpm build`, not in `pnpm generate`.

**Nuxt UI 4 + Tailwind 4.** `app/assets/css/main.css` is the Tailwind entrypoint: it imports `tailwindcss` and `@nuxt/ui`, declares the Manrope font stack in an `@theme` block, and defines the type scale as `@utility type-display` / `type-title` / `type-eyebrow`. Tailwind has no JS config file — all theming lives in CSS plus `app/app.config.ts` for Nuxt UI's own tokens (`primary` is `fuchsia`, `neutral` is `slate`). Colour mode preference is `system`, with `UColorModeButton` in the header.

Manrope really is self-hosted: `@nuxt/fonts` arrives as a dependency of `@nuxt/ui`, which auto-registers it with weights 400–700, and it reads families from the Tailwind `@theme`. Nothing to install, and it works under `pnpm generate` (the woff2 files land in `.output/public/_fonts/`).

Reach for a Nuxt UI `U*` component and existing tokens before writing hand-rolled markup or CSS. If a design needs a new colour or font, add it to the `@theme` block or `app.config.ts` so it stays a token, rather than hardcoding the value in a component.

**Never define a custom font size as a `--text-*` theme token.** Nuxt UI merges classes with tailwind-merge, which cannot tell a custom `text-foo` from a text *colour* and silently drops it in favour of `text-highlighted`. Custom type scales go in `@utility type-*`, which tailwind-merge leaves alone.

To replace a Nuxt UI slot's classes outright rather than append to them, pass a function: `:ui="{ title: () => 'type-display text-highlighted' }"`. That is the supported escape hatch when the theme's own classes conflict with yours.

**`ULink` localizes `to` automatically** when i18n is present, so a path that is already localized gets prefixed a second time. Paths coming out of `useSwitchLocalePath()` must be passed with `locale: false` (see `AppHeaderActions.vue`), or `switchLocalePath('en')` → `/` comes back out as `/es`.

**Components are auto-imported with `pathPrefix: false`** (`nuxt.config.ts`). A component at `app/components/forms/Field.vue` is `<Field />`, not `<FormsField />`. Component filenames must therefore be **globally unique** across all subdirectories, and must not collide with Nuxt UI's `U*` names or Nuxt built-ins.

**view / container / presentational.** Components are grouped by context, with the context repeated in the filename because of `pathPrefix: false`:

- **view** — `app/pages/index.vue`, or a layout for shared chrome. Composes sections and nothing else: no `<script setup>`, no logic, no fetching.
- **container** — the root of one section, e.g. `app/components/home/hero/HomeHero.vue`. Reads what the section needs through an auto-imported composable and passes it down.
- **presentational** — the partials of that container, e.g. `app/components/home/hero/HomeHeroTree.vue`. Props in, markup out.

Anything a second project would want lives under the `app` context with a layout as its view: `app/components/app/header/AppHeader.vue`, `app/components/app/footer/AppFooter.vue`. A presentational shared by several sections of one context goes in that context's `shared/` folder, e.g. `app/components/home/shared/HomeSectionEyebrow.vue`.

Sections read data through a composable in `app/composables/`. Several containers may call the same one; `useAsyncData` with the same key dedupes the request. Guard on the data (`v-if`) rather than asserting it with `!`.

**Layouts.** `app/layouts/default.vue` is `AppHeader` + `UMain` + `AppFooter` with **no `UContainer`**, because `UHeader`, `UFooter`, `UPageHero`, `UPageSection` and `UPageCTA` each render one internally — wrapping them again double-pads everything. `app/layouts/contained.vue` adds the `UContainer` for pages rooted in `UPage` + `UPageHeader`, which do *not* self-contain. Check the family with `grep -rln UContainer node_modules/@nuxt/ui/dist/runtime/components/*.vue` before choosing.

Keeping the landing on `default` is what lets `app/pages/index.vue` stay free of `definePageMeta`, and therefore free of a `<script setup>` block.

**Pinia stores** live in `app/stores/` and are named `<domain>.store.ts`. They use setup syntax with state grouped into a single `reactive` object exposed as `state`, following `app/stores/app.store.ts`:

```ts
export const useAppStore = defineStore('app', () => {
  const state = reactive({})

  return {
    state,
  }
})
```

`defineStore`, `reactive`, and the store composables themselves are auto-imported — no explicit imports needed.

**Two languages, two sources of text.** English is the default at `/`, Spanish at `/es`
(`strategy: 'prefix_except_default'`). `detectBrowserLanguage` is deliberately `false`: on static
hosting the cookie redirect runs on the client over already-prerendered HTML, and the jump is visible.

- **Section copy** lives in `content/<locale>/index.yml`, validated against the shared schema in
  `content.config.ts`.
- **Interface strings** — nav, footer, aria-labels — live in `app/locales/<locale>.json`.

Don't mix them. A heading belongs to Content; a button's aria-label belongs to i18n.

**Nuxt Content collections are one per page per locale**, named literally (`home_en`, `home_es`),
because `queryCollection()` needs a literal to type its result. A new page means a new pair. They are
`type: 'data'` over a single YAML file, so the schema stays exact instead of having to cover every
page in the locale.

`content.experimental.sqliteConnector: 'native'` uses `node:sqlite` (Node 24) and avoids
`better-sqlite3`, whose native build pnpm 11 would block behind `pnpm approve-builds`. In the browser
Content ships the database as WASM SQLite, which is what makes client-side navigation work on static
hosting.

**`@nuxtjs/mdc` is a direct devDependency on purpose, and its version must track `@nuxt/content`.**
Content depends on MDC and imports it at module load, and MDC pushes `@nuxtjs/mdc > <pkg>` entries
into `vite.optimizeDeps.include`. Under pnpm's isolated `node_modules`, MDC is not resolvable from the
project root, so every one of those entries fails and `pnpm dev` prints `NUXT_B7002` on each start.
Declaring MDC directly makes the first hop resolve and the warning disappears.

The trap: our range has to stay compatible with Content's, or pnpm installs **two** copies of MDC —
worse than the warning it fixed. When bumping `@nuxt/content`, read the `@nuxtjs/mdc` range in its
`package.json` and match it here, then confirm with
`find node_modules/.pnpm -maxdepth 1 -name "@nuxtjs+mdc@*"` that only one version is referenced by
`pnpm-lock.yaml`. This is a workaround for an upstream bug; drop it if MDC starts resolving its own
nested deps.

**No icon names in content.** A name coming out of YAML is not statically analysable, and Nuxt Icon
here only bundles the icons Nuxt UI declares — anything else renders as an empty box. Pick chrome
icons from that list, verified with
`grep -rhoE "i-lucide-[a-z0-9-]+" node_modules/@nuxt/ui/dist | sort -u`, and keep package versions
out of content too: they drift from `package.json` silently.

**Transitions** are enabled globally: `pageTransition` and `layoutTransition` are both named and `out-in` in `nuxt.config.ts`, with the matching `.page-*` / `.layout-*` classes in `app/assets/css/animations.css`. Renaming a transition in the config means renaming those classes too. Any new global CSS file must be registered in the `css` array of `nuxt.config.ts`.

`app/app.vue` wraps everything in `<UApp>` (required for Nuxt UI overlays/toasts) plus `NuxtRouteAnnouncer` and `NuxtLoadingIndicator`. Keep that shell intact.

## Lint

ESLint comes from `createConfigForNuxt` with `features.stylistic: true` (`eslint.config.ts`) — formatting is enforced by ESLint, not Prettier. There is no Prettier config; don't add one. Notable stylistic rules in effect: no semicolons, single quotes, and trailing commas in multiline literals.

The config is extended with `.append()` for one project rule: `vue/block-order` requires
`<template>` before `<script>` before `<style>` in every `.vue` file.
