# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A reusable Nuxt 4 starter template, cloned as the base for new projects, built to produce **landings
fast**: a page is a markdown file that composes generic components, in two languages. It ships one
page — a bilingual home that documents the template itself — plus an empty placeholder store in
`app/stores/app.store.ts`.

The test of any change here: adding a landing must stay a matter of adding one markdown file per
locale, with no `.vue` file and no config edit.

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

To replace a Nuxt UI slot's classes outright rather than append to them, pass a function: `:ui="{ title: () => 'type-display text-highlighted' }"`. That is the supported escape hatch when the theme's own classes conflict with yours, and it works in `app.config.ts` too — which is where this template uses it.

**Section standardisation lives in `app/app.config.ts`, not in the wrappers.** `ui.pageHero`,
`ui.pageSection` and `ui.pageCTA` carry the padding, typography and left alignment, so every section
matches, and it is the only place a section's look is defined. Three traps:

- **The config key is the component's own name, and case matters.** It is `pageCTA`, not `pageCta` —
  a mistyped key is ignored in silence. Confirm with
  `grep -o 'appConfig.ui?.[a-zA-Z]*' node_modules/@nuxt/ui/dist/runtime/components/<Name>.vue`.
- **Variants beat slots.** Nuxt UI's `vertical` orientation variant centres the title and links, so
  overriding `slots.title` is not enough; the left alignment has to be set under
  `variants.orientation.vertical` as well.

**Nuxt UI prose classes are utilities, so they beat anything in `@layer components`.** Any rule in
`template.css` that has to override a `Prose*` default must stay **unlayered** — inside a layer it
silently loses the cascade.

**`ULink` localizes `to` automatically** when i18n is present, so a path that is already localized gets prefixed a second time. Paths coming out of `useSwitchLocalePath()` must be passed with `locale: false` (see `AppHeaderActions.vue`), or `switchLocalePath('en')` → `/` comes back out as `/es`.

**Components are auto-imported with `pathPrefix: false`** (`nuxt.config.ts`). A component at `app/components/forms/Field.vue` is `<Field />`, not `<FormsField />`. Component filenames must therefore be **globally unique** across all subdirectories, and must not collide with Nuxt UI's `U*` names or Nuxt built-ins.

**A page is a markdown file; components are reusable and generic.** There is exactly one view,
`app/pages/[...slug].vue`, which resolves the markdown for the current route and hands it to
`ContentRenderer`. `app/components/` holds no page-specific or section-specific components at all:

- **view** — `app/pages/[...slug].vue`, or a layout for shared chrome.
- **page** — `content/<locale>/pages/<slug>.md`. Composes sections and carries the copy. No styling
  decisions, no logic.
- **section** — a Nuxt UI component used straight from the markdown: `::u-page-hero`,
  `::u-page-section`, `::u-page-cta`, plus prose components like `::card-group` and `::steps`.

**The markdown uses Nuxt UI components only.** There is no wrapper layer, and adding one is a
regression: a wrapper is a second API to document and keep in sync with a component Nuxt UI already
maintains. If a section needs a different look, it goes in `app/app.config.ts`; if it needs a one-off
style, it goes in `app/assets/css/template.css`. The only components in the repo are `AppHeader` and
`AppFooter`, which exist because they need `useI18n` and `useSwitchLocalePath`, and they live under
`app/components/app/<family>/<component>/` following how Nuxt UI organises its own.

You can check the rule holds: after a build, `node_modules/.cache/nuxt/.nuxt/content/components.ts`
lists the components the markdown actually used. It should contain nothing but `U*` and `Prose*`.

**Layouts.** `app/layouts/default.vue` is `AppHeader` + `UMain` + `AppFooter` with **no `UContainer`**, because `UHeader`, `UFooter`, `UPageHero`, `UPageSection` and `UPageCTA` each render one internally — wrapping them again double-pads everything. A page that does need containment writes `::u-container` in its own markdown, the way the CTA section does. Check which components self-contain with `grep -rln UContainer node_modules/@nuxt/ui/dist/runtime/components/*.vue`.

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

- **Page copy** lives in `content/<locale>/pages/<slug>.md` — headings, body text, card text.
- **Interface strings** — nav, footer, aria-labels — live in `app/locales/<locale>.json`.

Don't mix them. A heading belongs to Content; a button's aria-label belongs to i18n.

**One `type: 'page'` collection per locale**, `pages_en` and `pages_es`, named literally because
`queryCollection()` needs a literal to type its result. Each uses `source.cwd` to point at
`content/<locale>/pages` with `prefix: '/'`, so the collection's own `path` is locale-free and
matches the site route: `content/en/pages/index.md` → `/`, `content/es/pages/about.md` → `/about`
inside `pages_es`. Without `cwd`, `stem` and `path` are relative to the content root instead
(`en/pages/index`, `/en/pages`) and nothing matches.

**Page resolution lives in two places, on purpose.** `shared/utils/content.ts` holds the pure
functions — `pageCollection(locale)` builds the collection name and is the **single** place that casts
to `keyof PageCollections`, because `queryCollection()` demands a literal; `contentPath()` and
`pathSegments()` convert between route slugs and content paths. `app/composables/usePage.ts` is the
part that talks to Content: the query, the 404, and the locale params. Nothing is keyed on a specific
language, so a third locale is a collection in `content.config.ts` plus a locale in `nuxt.config.ts`
and no code change.

**The author decides the URL** with `path` in the frontmatter. It works because Content's
`pathMetaTransformer` returns `{ path: filePath, ...content, … }` — the frontmatter spread comes after
the computed path, so a declared `path` wins. Do **not** add `path` to the zod schema: the field is
already required on `PageCollectionItemBase`, and declaring it optional there weakens the type to
`string | undefined` for no reason.

`stem` is the bridge between locales. It is assigned *after* the frontmatter spread, so it cannot be
overridden, which makes it the stable identity of a page: `content/en/pages/pricing.md` and
`content/es/pages/pricing.md` share `stem: pricing` while serving `/pricing` and `/es/precios`.
`usePage()` uses it to find the sibling page and feeds `useSetI18nParams`, without which the locale
switcher would send `/pricing` to `/es/pricing` and 404. (`i18n.pages` cannot help here: it maps route
*names*, and a catch-all is one route for every page.)

No page found means `createError({ statusCode: 404, fatal: true })`.

**`nitro.prerender.routes` is derived from the content files** by `pageRoutes()` in
`nuxt.config.ts`, which reads `content/<locale>/pages` at config time and honours a `path` declared in
the frontmatter, falling back to the filename. A catch-all is invisible to the crawler, so without
this every new landing would need a hand-written route entry — which would defeat the point. Adding a
`.md` is genuinely all that is required.

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

## Writing a page in MDC

A section is a component block with a YAML block for its header and child components for its body:

```md
::u-page-section
---
id: stack
headline: package.json
title: What comes wired
description: >-
  Prose that may safely contain a colon: like this one.
---
:::card-group
::::card{title="Nuxt 4"}
Body text.
::::
:::
::
```

Five rules, each of which fails **silently** if broken:

1. **Always use `>-` for prose in a YAML block.** A bare `description:` whose text contains a colon
   followed by a space is parsed as a nested map, and the component receives an object where it
   expects a string. Nothing warns you; the section just renders wrong.
2. **Never indent the body of a component block.** Indentation turns `#slot-name` markers and even
   `:::` fences into paragraphs. Indent *only* the continuation lines inside a YAML block, where
   indentation is what makes the block scalar work.
3. **Nesting adds a colon per level:** `::` → `:::` → `::::`, and the closing fence must match its
   opener. Past three levels, reconsider the structure.
4. **Lists and objects are fine in the YAML block.** `links:` as a YAML list works — MDC stores it as
   a `:links` prop holding JSON and the renderer binds it. Writing `:links='[…]'` by hand is never
   necessary.
5. **A component whose name has an uppercase acronym cannot be reached in kebab-case.**
   `pascalCase('u-page-cta')` is `UPageCta`, not `UPageCTA`, so the tag silently fails to resolve —
   and MDC lowercases the tag, so writing `::UPageCTA` does not help either. The fix is an entry in
   `mdc.components.map` in `nuxt.config.ts`, which is why `'u-page-cta': 'UPageCTA'` is there. **In
   dev it resolves anyway**, so this only shows up in a build.

Prefer Nuxt UI's own prose components over new ones: `::card-group` + `::card`, `::steps`
(numbers `###` headings with CSS counters), `::callout`, `::code-group`, `::tabs`. Nuxt UI registers
43 of them here with no configuration, and MDC maps the short names — `ui.mdc` is deprecated and
does not need setting. The full map is in `@nuxt/ui/dist/module.mjs`.

**Components in markdown are discovered, not registered.** Content parses the markdown at build time
and records the components each file uses, which feeds `#content/components`. In dev *every*
component resolves; in a production build only the ones in that manifest (or marked `global`) do.
**So a page that works in `pnpm dev` can still break in `pnpm build`** — always verify a markdown
change against a real build, not just the dev server.

**The dev content cache lies after an edit.** `.data/content/contents.sqlite` frequently keeps the
previous parse of a file that has just changed, so the page you see and the AST you inspect can both
be stale. When a markdown change appears not to work, `rm -rf .data` and restart before debugging
anything else. To read the real AST:

```bash
node -e "const {DatabaseSync}=require('node:sqlite');
const db=new DatabaseSync('.data/content/contents.sqlite');
console.log(db.prepare('SELECT body FROM _content_pages_en').get().body)"
```

The body is in `minimark` format — nested `[tag, props, ...children]` arrays, not the older
`{ type, tag, children }` tree.

**No icon names in content.** A name coming out of YAML is not statically analysable, and Nuxt Icon
here only bundles the icons Nuxt UI declares — anything else renders as an empty box. Pick chrome
icons from that list, verified with
`grep -rhoE "i-lucide-[a-z0-9-]+" node_modules/@nuxt/ui/dist | sort -u`, and keep package versions
out of content too: they drift from `package.json` silently.

**Two CSS files, with different jobs.** `app/assets/css/main.css` holds the Tailwind and Nuxt UI
imports, the `@theme` tokens and the `type-*` utilities — the design system. `app/assets/css/template.css`
holds styles that exist only for this template, currently the `.page-*` / `.layout-*` transition
classes. `pageTransition` and `layoutTransition` are named and `out-in` in `nuxt.config.ts`, so
renaming a transition there means renaming those classes too. Any new global CSS file must be
registered in the `css` array of `nuxt.config.ts`.

`app/app.vue` wraps everything in `<UApp>` (required for Nuxt UI overlays/toasts) plus `NuxtRouteAnnouncer` and `NuxtLoadingIndicator`. Keep that shell intact.

## Lint

ESLint comes from `createConfigForNuxt` with `features.stylistic: true` (`eslint.config.ts`) — formatting is enforced by ESLint, not Prettier. There is no Prettier config; don't add one. Notable stylistic rules in effect: no semicolons, single quotes, and trailing commas in multiline literals.

The config is extended with `.append()` for one project rule: `vue/block-order` requires
`<template>` before `<script>` before `<style>` in every `.vue` file.
