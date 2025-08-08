export default defineNuxtConfig({
  modules: [
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@nuxt/ui',
    '@compodium/nuxt',
  ],
  components: [
    { path: '@/components', pathPrefix: false },
  ],
  devtools: {
    enabled: import.meta.env.DEVTOOLS_ENABLED || false,
    timeline: {
      enabled: true,
    },
  },
  css: ['@/assets/css/main.css'],
  colorMode: {
    preference: 'light',
  },
  compatibilityDate: '2025-07-15',
  telemetry: {
    enabled: false,
  },
  compodium: {
    includeLibraryCollections: false,
  },
  i18n: {
    defaultLocale: 'en',
    locales: [
      { code: 'en', language: 'en-EN', file: 'en.json' },
    ],
    langDir: 'locales',
    restructureDir: './app',
  },
  pinia: {
    storesDirs: ['./app/stores/**.store.ts'],
  },
})
