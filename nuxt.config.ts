export default defineNuxtConfig({
  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
    layoutTransition: { name: 'layout', mode: 'out-in' }
  },
  colorMode: {
    fallback: 'light'
  },
  components: [
    { path: '@/components', pathPrefix: false }
  ],
  css: ['@/assets/css/main.css'],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true
    }
  },
  srcDir: 'frontend',
  serverDir: 'server',
  nitro: {
    experimental: {
      openAPI: true
    }
  },
  modules: [
    '@nuxt/fonts',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@pinia/nuxt',
    '@nuxt/ui'
  ],
  fonts: {
    families: [
      { name: 'Inter', provider: 'fontsource' }
    ]
  },
  i18n: {
    locales: [
      {
        code: 'en',
        iso: 'en',
        file: 'en-EN.json',
        name: 'English'
      }
    ],
    lazy: true,
    langDir: 'lang',
    defaultLocale: 'en'
  },
  pinia: {
    storesDirs: ['./frontend/stores/**.store.ts']
  },
  tailwindcss: {
    configPath: './frontend/tailwind.config.ts',
    viewer: false
  },
  ui: {
    global: true
  }
})
