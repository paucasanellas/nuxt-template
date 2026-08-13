import { version } from './package.json'

export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
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
    preference: 'light',
  },
  runtimeConfig: {
    public: {
      version,
    },
  },
  compatibilityDate: 'latest',
  telemetry: false,
  i18n: {
    baseUrl: 'https://template.app',
    defaultLocale: 'es',
    strategy: 'no_prefix',
    locales: [
      { code: 'es', language: 'es', file: 'es.json' },
    ],
    langDir: 'locales',
    restructureDir: './app',
  },
})
