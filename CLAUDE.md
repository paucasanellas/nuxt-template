# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A reusable Nuxt 4 starter template, cloned as the base for projects that grow large: pages are Vue
views fed by **typed content** — YAML per locale, validated by zod schemas — with state, a server DI
container and quality gates already wired. It ships one page — a bilingual home that documents the
template itself.

The test of any change here: adding a page must stay a matter of extending `content.config.ts` with
its schema, adding one view, and one YAML file per locale. The schema is the single contract; the
view never guesses at the content's shape.

Treat the existing files as the conventions to follow and extend, not as an app to refactor. When
adding something here, ask whether every future project cloned from this template wants it.

The home page is also documentation: it names real paths and real commands. If you change a
convention, the copy in `content/en/pages/home.yml` and `content/es/pages/home.yml` has to change
with it, or the page starts lying.

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`, `pnpm-workspace.yaml`).

```bash
pnpm dev              # dev server — http://localhost:8000, not 3000 (see Environment)
pnpm build            # production build (SSR, server/ included)
pnpm preview          # serve the production build locally
pnpm lint             # eslint .
pnpm lint:fix         # eslint . --fix
pnpm typecheck        # vue-tsc --build --noEmit
pnpm typecheck:watch  # same, in watch mode
```

There is no `pnpm generate` and no static target: the template is SSR-only, `server/` is part of the
product. Run `pnpm lint` and `pnpm typecheck` before considering a change done. There is no test
framework installed; don't invent test commands.

After installing a module or touching `nuxt.config.ts` or `content.config.ts`, run `pnpm postinstall`
(`nuxt prepare`) before `pnpm typecheck` — otherwise `.nuxt` types are stale and typecheck reports
missing auto-imports that in fact exist.

## Quality gates

`.husky/pre-push` runs `pnpm lint` and then `pnpm typecheck`, so a push fails if either does — running both yourself first is the cheaper path. `.husky/commit-msg` runs commitlint, so a commit is rejected outright if its message doesn't parse.

Husky executes hook files with `sh -e`, so each check goes on its own line and the hook aborts at the first non-zero exit. Adding a gate means appending a line, not extending an `&&` chain.

`.github/workflows/ci.yml` runs on pull requests to `main`: `quality` (lint, then typecheck) first, then `build`, which declares `needs: quality` and is skipped if quality fails. Both use `pnpm/setup@v2`, which installs pnpm, installs Node and runs `pnpm install` in one step, reading the versions from `packageManager` and `devEngines.runtime` in `package.json` — that's where a Node or pnpm version bump goes, not in the workflow.

The `concurrency` group keys on the pull request number, so pushing again cancels the run still in flight rather than queueing a second one.

Job ids stay plain (`quality`, `build`) because they are what a branch-protection ruleset references; the emoji live on step names only.

Commit messages are validated against `@commitlint/config-conventional` with no overrides — the config is the `commitlint` field in `package.json`, not a separate file. The defaults apply: the eleven standard types, header ≤100 chars, lowercase subject with no trailing period. Merge commits are skipped by commitlint's default ignores.

The hooks are installed by the `prepare` script, which coexists with the existing `postinstall: nuxt prepare`. CI sets `HUSKY: 0` so the runner doesn't install hooks.

## Environment

`.env` sets `PORT=8000`, which Nitro picks up automatically — the dev server and preview both listen on **8000**. The README still says 3000 (it is the untouched Nuxt scaffold README); the `.env` wins.

`.env.example` is the tracked contract for env vars. Any new variable read by the app must be added there, and consumed through `runtimeConfig` in `nuxt.config.ts` rather than `process.env` in app code. `runtimeConfig.public` currently carries `version` (read from `package.json`), `repositoryUrl` and the i18n `baseUrl`.

## Architecture

Nuxt 4 with `srcDir` defaulting to `app/`. `server/` holds Nitro routes with a hexagonal layout and
an awilix container (see `server/contexts/health` for the pattern: domain, application, ui, wired in
`server/di/`); it is unrelated to page content and stays as is.

**Nuxt UI 4 + Tailwind 4.** `app/assets/css/main.css` is the Tailwind entrypoint: it imports `tailwindcss` and `@nuxt/ui`, declares the Manrope font stack in an `@theme` block, and defines the type scale as `@utility type-display` / `type-title` / `type-eyebrow`. Tailwind has no JS config file — all theming lives in CSS plus `app/app.config.ts` for Nuxt UI's own tokens (`primary` is `fuchsia`, `neutral` is `slate`). Colour mode preference is `system`, with `UColorModeButton` in the header.

Manrope really is self-hosted: `@nuxt/fonts` arrives as a dependency of `@nuxt/ui`, which auto-registers it with weights 400–700, and it reads families from the Tailwind `@theme`.

Reach for a Nuxt UI `U*` component and existing tokens before writing hand-rolled markup or CSS. If a design needs a new colour or font, add it to the `@theme` block or `app.config.ts` so it stays a token, rather than hardcoding the value in a component.

**Never define a custom font size as a `--text-*` theme token.** Nuxt UI merges classes with tailwind-merge, which cannot tell a custom `text-foo` from a text *colour* and silently drops it in favour of `text-highlighted`. Custom type scales go in `@utility type-*`, which tailwind-merge leaves alone.

To replace a Nuxt UI slot's classes outright rather than append to them, pass a function: `:ui="{ title: () => 'type-display text-highlighted' }"`. That is the supported escape hatch when the theme's own classes conflict with yours, and it works in `app.config.ts` too — which is where this template uses it.

**Section standardisation lives in `app/app.config.ts`, not in the views.** `ui.pageHero`,
`ui.pageSection` and `ui.pageCTA` carry the padding, typography and left alignment, so every section
matches, and it is the only place a section's look is defined. Two traps:

- **The config key is the component's own name, and case matters.** It is `pageCTA`, not `pageCta` —
  a mistyped key is ignored in silence. Confirm with
  `grep -o 'appConfig.ui?.[a-zA-Z]*' node_modules/@nuxt/ui/dist/runtime/components/<Name>.vue`.
- **Variants beat slots.** Nuxt UI's `vertical` orientation variant centres the title and links, so
  overriding `slots.title` is not enough; the left alignment has to be set under
  `variants.orientation.vertical` as well.

**Components are auto-imported with `pathPrefix: false`** (`nuxt.config.ts`). A component at `app/components/forms/Field.vue` is `<Field />`, not `<FormsField />`. Component filenames must therefore be **globally unique** across all subdirectories, and must not collide with Nuxt UI's `U*` names or Nuxt built-ins. The only components in the repo are `AppHeader` and `AppFooter`, which exist because they need `useI18n` and `useSwitchLocalePath`, and they live under `app/components/app/<family>/<component>/` following how Nuxt UI organises its own.

**`ULink` localizes `to` automatically** when i18n is present, so a path that is already localized gets prefixed a second time. Paths coming out of `useSwitchLocalePath()` must be passed with `locale: false` (see `AppHeaderActions.vue`), or `switchLocalePath('en')` → `/` comes back out as `/es`.

**Layouts.** `app/layouts/default.vue` is `AppHeader` + `UMain` + `AppFooter` with **no `UContainer`**, because `UHeader`, `UFooter`, `UPageHero`, `UPageSection` and `UPageCTA` each render one internally — wrapping them again double-pads everything. A view that does need containment adds its own `UContainer`, the way `index.vue` wraps `UPageCTA`. Check which components self-contain with `grep -rln UContainer node_modules/@nuxt/ui/dist/runtime/components/*.vue`.

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

`app/app.vue` wraps everything in `<UApp>` (required for Nuxt UI overlays/toasts) plus `NuxtRouteAnnouncer` and `NuxtLoadingIndicator`. Keep that shell intact.

**Two CSS files, with different jobs.** `app/assets/css/main.css` holds the Tailwind and Nuxt UI
imports, the `@theme` tokens and the `type-*` utilities — the design system. `app/assets/css/template.css`
holds styles that exist only for this template, currently the `.page-*` / `.layout-*` transition
classes. `pageTransition` and `layoutTransition` are named and `out-in` in `nuxt.config.ts`, so
renaming a transition there means renaming those classes too. Any new global CSS file must be
registered in the `css` array of `nuxt.config.ts`.

## Content

**A page is a schema, a view and one YAML file per locale.** The pattern is the one the Nuxt UI docs
use for their own site (`nuxt/ui` → `docs/content.config.ts`): element schemas composed into page
schemas, one collection per page.

- **schema** — `content.config.ts` defines the element schemas (`Button`, `PageFeature`, `PageHero`,
  `PageSection`, `Page`) and one collection per page and locale: `home_en`, `home_es`. A new page
  extends `Page` with its named sections and declares its two collections.
- **content** — `content/<locale>/pages/<page>.yml`. Data only: copy, links, features. It is
  validated against the schema on every build; a field the schema doesn't declare is dropped, a
  missing required field fails the parse.
- **view** — `app/pages/<page>.vue`. Binds the typed content to Nuxt UI sections
  (`<UPageSection v-bind="page.stack" />` — the schema's fields are the component's props, including
  the native `features` prop). Anchor ids live in the view, matching `AppHeaderNav`, not in content.

Collections are named **literally** (`home_en`, not a computed key) because `queryCollection()`
needs a literal to type its result. `usePage()` in `app/composables/page.ts` exposes a single
`fetch(name, locale)`, which is the one place that assembles `` `${name}_${locale}` `` and casts it
to `keyof Collections`; everything downstream is typed by zod inference. Collections use
`type: 'page'`, so top-level `title` and `description` exist by default and feed `useSeoMeta`.

**The composable only fetches; the view owns the orchestration.** `usePage().fetch` is data access
and the type cast, nothing else. Each view repeats its own `useAsyncData`, 404 and `useSeoMeta` — that
repetition is deliberate: what a page does on load stays readable in the page itself, at the cost of
a few duplicated lines per view. Three conventions the view-side code keeps:

1. The `useAsyncData` key is a function and includes the locale (plus `watch: [locale]`), so
   switching language refetches instead of serving the first locale from cache.
2. No document means `createError({ statusCode: 404, fatal: true })`.
3. The template guards with `v-if="page"` because `data` is nullable — the throw above doesn't
   narrow a ref for the template's type check.

**Interface strings vs page copy.** Nav, footer and aria-labels live in `app/locales/<locale>.json`;
page copy lives in `content/`. Don't mix them: a heading belongs to Content, a button's aria-label
belongs to i18n. English is the default at `/`, Spanish at `/es` (`strategy: 'prefix_except_default'`).
`detectBrowserLanguage` is deliberately `false`. Views are real routes, so the locale switcher works
through `useSwitchLocalePath` with no extra wiring; a page whose slug differs per locale declares it
with `@nuxtjs/i18n`'s custom route paths, not with content.

**The dev content cache lies after an edit.** `.data/content/contents.sqlite` can keep the previous
parse of a file that has just changed. When a YAML change appears not to work, `rm -rf .data` and
restart before debugging anything else.

**No icon names in content beyond installed collections.** Icons referenced from YAML resolve at
runtime from the collections installed locally — only `@iconify-json/lucide` is — so content sticks
to `i-lucide-*` names. Chrome components hardcode their icons and are statically analysed anyway.

`content.experimental.sqliteConnector: 'native'` uses `node:sqlite` (Node 24) and avoids
`better-sqlite3`, whose native build pnpm 11 would block behind `pnpm approve-builds`.

**`@nuxtjs/mdc` is a direct devDependency on purpose, and its version must track `@nuxt/content`.**
Content depends on MDC and imports it at module load, and MDC pushes `@nuxtjs/mdc > <pkg>` entries
into `vite.optimizeDeps.include`. Under pnpm's isolated `node_modules`, MDC is not resolvable from the
project root, so every one of those entries fails and `pnpm dev` prints `NUXT_B7002` on each start.
Declaring MDC directly makes the first hop resolve and the warning disappear.

The trap: our range has to stay compatible with Content's, or pnpm installs **two** copies of MDC —
worse than the warning it fixed. When bumping `@nuxt/content`, read the `@nuxtjs/mdc` range in its
`package.json` and match it here, then confirm with
`find node_modules/.pnpm -maxdepth 1 -name "@nuxtjs+mdc@*"` that only one version is referenced by
`pnpm-lock.yaml`. This is a workaround for an upstream bug; drop it if MDC starts resolving its own
nested deps.

## Lint

ESLint comes from `createConfigForNuxt` with `features.stylistic: true` (`eslint.config.ts`) — formatting is enforced by ESLint, not Prettier. There is no Prettier config; don't add one. Notable stylistic rules in effect: no semicolons, single quotes, and trailing commas in multiline literals.

The config is extended with `.append()` for one project rule: `vue/block-order` requires
`<template>` before `<script>` before `<style>` in every `.vue` file.
