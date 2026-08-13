export default defineNuxtConfig({
  modules: [
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
  compatibilityDate: 'latest',
})
