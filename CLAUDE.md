# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

A reusable Nuxt 4 starter template, cloned as the base for new projects. It is intentionally near-empty: `app/pages/index.vue` renders `<NuxtWelcome />`, `app/stores/app.store.ts` is an empty placeholder store, and there is no `app/components/` directory yet.

Treat the existing files as the conventions to follow and extend, not as an app to refactor. When adding something here, ask whether every future project cloned from this template wants it.

## Commands

Package manager is **pnpm** (`pnpm-lock.yaml`, `pnpm-workspace.yaml`).

```bash
pnpm dev              # dev server — http://localhost:8000, not 3000 (see Environment)
pnpm build            # production build
pnpm preview          # serve the production build locally
pnpm generate         # static prerender
pnpm lint             # eslint .
pnpm lint:fix         # eslint . --fix
pnpm typecheck        # vue-tsc --build --noEmit
pnpm typecheck:watch  # same, in watch mode
```

Run `pnpm lint` and `pnpm typecheck` before considering a change done. There is no test framework installed; don't invent test commands.

## Quality gates

`.husky/pre-push` runs `pnpm lint` and then `pnpm typecheck`, so a push fails if either does — running both yourself first is the cheaper path. `.husky/commit-msg` runs commitlint, so a commit is rejected outright if its message doesn't parse.

Husky executes hook files with `sh -e`, so each check goes on its own line and the hook aborts at the first non-zero exit. Adding a gate means appending a line, not extending an `&&` chain.

`.github/workflows/ci.yml` runs two jobs in parallel on pull requests to `main`: `quality` (lint, then typecheck) and `build`. Neither declares `needs`, which is what makes them concurrent — adding `needs` would serialise them. Both use `pnpm/setup@v2`, which installs pnpm, installs Node and runs `pnpm install` in one step, reading the versions from `packageManager` and `devEngines.runtime` in `package.json` — that's where a Node or pnpm version bump goes, not in the workflow.

Job ids stay plain (`quality`, `build`) because they are what a branch-protection ruleset references; the emoji live on step names only.

Commit messages are validated against `@commitlint/config-conventional` with no overrides — the config is the `commitlint` field in `package.json`, not a separate file. The defaults apply: the eleven standard types, header ≤100 chars, lowercase subject with no trailing period. Merge commits are skipped by commitlint's default ignores.

The hooks are installed by the `prepare` script, which coexists with the existing `postinstall: nuxt prepare`. CI sets `HUSKY: 0` so the runner doesn't install hooks.

## Environment

`.env` sets `PORT=8000`, which Nitro picks up automatically — the dev server and preview both listen on **8000**. The README still says 3000 (it is the untouched Nuxt scaffold README); the `.env` wins.

`.env.example` is the tracked contract for env vars. Any new variable read by the app must be added there, and consumed through `runtimeConfig` in `nuxt.config.ts` rather than `process.env` in app code.

## Architecture

Nuxt 4 with `srcDir` defaulting to `app/`. There is no `server/` directory — this is a client-rendered/prerendered app until someone adds Nitro routes.

**Nuxt UI 4 + Tailwind 4.** `app/assets/css/main.css` is the Tailwind entrypoint: it imports `tailwindcss` and `@nuxt/ui`, then declares theme tokens in an `@theme` block (currently the Manrope font stack). Tailwind has no JS config file — all theming lives in CSS `@theme` plus `app/app.config.ts` for Nuxt UI's own tokens (`ui.colors.primary` is `fuchsia`). Colour mode is pinned to `light` in `nuxt.config.ts`.

Reach for a Nuxt UI `U*` component and existing theme tokens before writing hand-rolled markup or CSS. If a design needs a new colour or font, add it to the `@theme` block or `app.config.ts` so it stays a token, rather than hardcoding the value in a component.

**Components are auto-imported with `pathPrefix: false`** (`nuxt.config.ts`). A component at `app/components/forms/Field.vue` is `<Field />`, not `<FormsField />`. Component filenames must therefore be **globally unique** across all subdirectories, and must not collide with Nuxt UI's `U*` names or Nuxt built-ins.

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

**Transitions** are enabled globally: `pageTransition` and `layoutTransition` are both named and `out-in` in `nuxt.config.ts`, with the matching `.page-*` / `.layout-*` classes in `app/assets/css/animations.css`. Renaming a transition in the config means renaming those classes too. Any new global CSS file must be registered in the `css` array of `nuxt.config.ts`.

`app/app.vue` wraps everything in `<UApp>` (required for Nuxt UI overlays/toasts) plus `NuxtRouteAnnouncer` and `NuxtLoadingIndicator`. Keep that shell intact.

## Lint

ESLint comes from `createConfigForNuxt` with `features.stylistic: true` (`eslint.config.ts`) — formatting is enforced by ESLint, not Prettier. There is no Prettier config; don't add one. Notable stylistic rules in effect: no semicolons, single quotes, and trailing commas in multiline literals.
