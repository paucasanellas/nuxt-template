import { version } from './package.json'

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
    '@/assets/css/animations.css',
  ],
  colorMode: {
    preference: 'system',
  },
  content: {
    experimental: {
      sqliteConnector: 'native',
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
      routes: ['/', '/es'],
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
