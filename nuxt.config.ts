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
    pageTransition: {
      name: 'page',
      mode: 'out-in',
    },
  },
  css: [
    '@/assets/css/main.css',
  ],
  colorMode: {
    preference: 'system',
    fallback: 'light',
  },
  runtimeConfig: {},
  experimental: {
    asyncContext: true,
  },
  compatibilityDate: 'latest',
  nitro: {
    experimental: {
      openAPI: true,
    },
    openAPI: {
      meta: {
        title: 'Nuxt Template',
        description: '',
        version,
      },
      ui: {
        scalar: {
          route: '/docs',
        },
        swagger: false,
      },
    },
  },
  telemetry: false,
  i18n: {
    restructureDir: 'app',
    langDir: 'locales',
    locales: [
      {
        code: 'en',
        language: 'en-US',
        name: 'English',
        file: 'en.json',
      },
    ],
    defaultLocale: 'en',
    strategy: 'prefix_except_default',
    customRoutes: 'meta',
    detectBrowserLanguage: false,
  },
  icon: {
    clientBundle: {
      scan: true,
    },
  },
})
