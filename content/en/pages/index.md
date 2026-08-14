---
title: A Nuxt 4 starter with the decisions already made
description: Clone it, rename it, ship. Two languages, content, state, a DI container and quality gates, already wired together.
---

::u-page-hero
---
headline: nuxt-template/
title: A starter that already knows where everything goes.
description: >-
  Clone it, rename it, ship. Two languages, content, state, a DI container and the
  gates that keep the repo honest are already wired together.
links:
  - label: Use this template
    to: https://github.com/pcasanellas-dogfy/nuxt-template/generate
    trailingIcon: i-lucide-arrow-up-right
    target: _blank
---
::

::u-page-section
---
id: stack
headline: package.json
title: What comes wired
description: >-
  The decisions are already made, so your first commit on a new project can be a
  feature instead of a setup.
---
:::card-group
::::card{title="Nuxt 4"}
srcDir is app/. Components auto-import without a path prefix, so a filename is the
component name and has to be unique.
::::

::::card{title="Nuxt UI 4"}
Every U* component, themed from a single app.config.ts. The markdown uses them directly.
::::

::::card{title="Tailwind 4"}
No JS config file. Theme tokens are declared in an @theme block inside main.css.
::::

::::card{title="Nuxt Content 3"}
Pages are markdown that composes components. One collection per language, validated
against a zod schema.
::::

::::card{title="Nuxt i18n 10"}
English at /, Spanish at /es. Both languages are prerendered, so both are indexable.
::::

::::card{title="Pinia"}
Setup stores in app/stores, with state grouped into one reactive object.
::::

::::card{title="awilix"}
A strict DI container for server routes, built once and resolved per request.
::::

::::card{title="ESLint stylistic"}
Formatting is a lint error, not a second tool. There is no Prettier config to keep
in sync.
::::

::::card{title="Husky and commitlint"}
pre-push runs lint then typecheck. commit-msg rejects a message that does not parse.
::::
:::
::

::u-page-section
---
id: conventions
headline: content/
title: Four files, and none of them is a component
description: >-
  A landing is markdown that composes Nuxt UI components. There is one view for every
  page, and nothing under app/components/ that a page has to know about.
---
:::field-group
::::field{name="content/en/pages/index.md" type="Page"}
Sections and copy. No styling decisions, no logic. Set `path` in its frontmatter to
choose the URL.
::::

::::field{name="app/pages/[...slug].vue" type="View"}
Resolves the markdown for the current route. One file serves every page.
::::

::::field{name="app/app.config.ts" type="Style"}
Padding, typography and alignment for every section, declared once.
::::

::::field{name="app/components/app/header/AppHeader.vue" type="Chrome"}
The only components left: header and footer, because they need i18n.
::::
:::
::

::u-page-section
---
id: start
headline: README.md
title: Three commands to a running app
description: >-
  The dev server listens on 8000, not 3000 — .env sets the port and Nitro picks it up.
---
:::steps{level="3"}
### pnpm install

Installs dependencies, runs nuxt prepare and installs the git hooks.

### pnpm dev

Serves the app on localhost:8000 with devtools enabled.

### pnpm lint && pnpm typecheck

The two gates that pre-push and CI both run. Green here means green there.
:::
::

::u-container
:::u-page-cta
---
variant: subtle
title: Start from a repo that has already made these decisions
description: >-
  Rename it in package.json, replace the markdown in content/, and the home page is
  yours.
links:
  - label: Use this template
    to: https://github.com/pcasanellas-dogfy/nuxt-template/generate
    trailingIcon: i-lucide-arrow-up-right
    target: _blank
  - label: Read the conventions
    to: https://github.com/pcasanellas-dogfy/nuxt-template/blob/main/CLAUDE.md
    color: neutral
    variant: ghost
    trailingIcon: i-lucide-arrow-up-right
    target: _blank
---
:::
::
