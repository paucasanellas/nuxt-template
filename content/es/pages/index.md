---
title: Una plantilla de Nuxt 4 con las decisiones ya tomadas
description: Clónala, renómbrala y publica. Dos idiomas, contenido, estado, un contenedor de dependencias y quality gates, ya conectados.
---

::u-page-hero
---
headline: nuxt-template/
title: Una plantilla que ya sabe dónde va cada cosa.
description: >-
  Clónala, renómbrala y publica. Dos idiomas, contenido, estado, un contenedor de
  dependencias y las gates que mantienen el repo honesto vienen ya conectados.
links:
  - label: Usar esta plantilla
    to: https://github.com/pcasanellas-dogfy/nuxt-template/generate
    trailingIcon: i-lucide-arrow-up-right
    target: _blank
---
::

::u-page-section
---
id: stack
headline: package.json
title: Lo que ya viene conectado
description: >-
  Las decisiones están tomadas, así que tu primer commit en un proyecto nuevo puede ser
  una funcionalidad en vez de una configuración.
---
:::card-group
::::card{title="Nuxt 4"}
srcDir es app/. Los componentes se auto-importan sin prefijo de ruta, así que el nombre
del fichero es el del componente y tiene que ser único.
::::

::::card{title="Nuxt UI 4"}
Todos los componentes U*, tematizados desde un único app.config.ts. El markdown los usa
directamente.
::::

::::card{title="Tailwind 4"}
Sin fichero de configuración JS. Los tokens del tema se declaran en un bloque @theme
dentro de main.css.
::::

::::card{title="Nuxt Content 3"}
Las páginas son markdown que compone componentes. Una colección por idioma, validada
con un schema de zod.
::::

::::card{title="Nuxt i18n 10"}
Inglés en /, español en /es. Los dos idiomas se prerenderizan, así que los dos son
indexables.
::::

::::card{title="Pinia"}
Stores con sintaxis setup en app/stores, con el estado agrupado en un único objeto
reactive.
::::

::::card{title="awilix"}
Un contenedor de dependencias estricto para las rutas de servidor, creado una vez y
resuelto por petición.
::::

::::card{title="ESLint stylistic"}
El formato es un error de lint, no una segunda herramienta. No hay config de Prettier
que mantener sincronizada.
::::

::::card{title="Husky y commitlint"}
pre-push ejecuta lint y luego typecheck. commit-msg rechaza un mensaje que no parsee.
::::
:::
::

::u-page-section
---
id: conventions
headline: content/
title: Cuatro ficheros, y ninguno es un componente
description: >-
  Una landing es markdown que compone componentes de Nuxt UI. Hay una sola vista para
  todas las páginas, y nada en app/components/ que una página tenga que conocer.
---
:::field-group
::::field{name="content/es/pages/index.md" type="Página"}
Secciones y copy. Sin decisiones de estilo, sin lógica. Pon `path` en su frontmatter para
elegir la URL.
::::

::::field{name="app/pages/[...slug].vue" type="Vista"}
Resuelve el markdown de la ruta actual. Un solo fichero sirve todas las páginas.
::::

::::field{name="app/app.config.ts" type="Estilo"}
Paddings, tipografía y alineación de todas las secciones, declarados una vez.
::::

::::field{name="app/components/app/header/AppHeader.vue" type="Chrome"}
Los únicos componentes que quedan: header y footer, porque necesitan i18n.
::::
:::
::

::u-page-section
---
id: start
headline: README.md
title: Tres comandos hasta tener la app corriendo
description: >-
  El servidor de desarrollo escucha en el 8000, no en el 3000 — .env fija el puerto y
  Nitro lo coge.
---
:::steps{level="3"}
### pnpm install

Instala dependencias, ejecuta nuxt prepare e instala los hooks de git.

### pnpm dev

Sirve la app en localhost:8000 con las devtools activadas.

### pnpm lint && pnpm typecheck

Las dos gates que ejecutan tanto pre-push como CI. Si aquí pasa, allí también.
:::
::

::u-container
:::u-page-cta
---
variant: subtle
title: Empieza desde un repo que ya ha tomado estas decisiones
description: >-
  Renómbrala en package.json, sustituye el markdown de content/ y la home es tuya.
links:
  - label: Usar esta plantilla
    to: https://github.com/pcasanellas-dogfy/nuxt-template/generate
    trailingIcon: i-lucide-arrow-up-right
    target: _blank
  - label: Leer las convenciones
    to: https://github.com/pcasanellas-dogfy/nuxt-template/blob/main/CLAUDE.md
    color: neutral
    variant: ghost
    trailingIcon: i-lucide-arrow-up-right
    target: _blank
---
:::
::
