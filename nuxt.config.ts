export default defineNuxtConfig({
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
  compatibilityDate: '2025-07-15',
  telemetry: {
    enabled: false,
  },
})
