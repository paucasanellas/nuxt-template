import { readdirSync, readFileSync } from 'node:fs'

import { version } from './package.json'

function declaredPath(file: string) {
  const frontmatter = readFileSync(file, 'utf8').match(/^---\r?\n([\s\S]*?)\r?\n---/)

  return frontmatter?.[1]?.match(/^path:\s*(\S+)\s*$/m)?.[1]
}

function pageRoutes(locale: string, prefix: string) {
  const directory = `content/${locale}/pages`

  return readdirSync(directory, { recursive: true })
    .filter((file): file is string => typeof file === 'string' && file.endsWith('.md'))
    .map((file) => {
      const path = declaredPath(`${directory}/${file}`)
        ?? `/${file.replace(/\.md$/, '').replace(/(^|\/)index$/, '')}`

      return `${prefix}${path}`.replace(/\/+$/, '') || '/'
    })
}

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@nuxt/content',
    '@nuxt/ui',
    '@pinia/nuxt',
  ],
  components: [
    {
      path: '@/components',
      pathPrefix: false,
    },
  ],
  devtools: {
    enabled: true,
  },
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' },
  },
  css: [
    '@/assets/css/main.css',
    '@/assets/css/template.css',
  ],
  colorMode: {
    preference: 'system',
  },
  content: {
    experimental: {
      sqliteConnector: 'native',
    },
  },
  mdc: {
    components: {
      map: {
        'u-page-cta': 'UPageCTA',
      },
    },
  },
  runtimeConfig: {
    public: {
      version,
      repositoryUrl: 'https://github.com/pcasanellas-dogfy/nuxt-template',
      i18n: {
        baseUrl: '',
      },
    },
  },
  compatibilityDate: 'latest',
  nitro: {
    prerender: {
      crawlLinks: true,
      routes: [...pageRoutes('en', ''), ...pageRoutes('es', '/es')],
      failOnError: true,
    },
  },
  telemetry: false,
  i18n: {
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    detectBrowserLanguage: false,
    locales: [
      { code: 'en', language: 'en-US', name: 'English', file: 'en.json' },
      { code: 'es', language: 'es-ES', name: 'Español', file: 'es.json' },
    ],
    langDir: 'locales',
    restructureDir: './app',
  },
})
