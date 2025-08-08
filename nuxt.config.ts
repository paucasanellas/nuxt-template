export default defineNuxtConfig({
  devtools: {
    enabled: import.meta.env.DEVTOOLS_ENABLED || false,
    timeline: {
      enabled: true,
    },
  },
  compatibilityDate: '2025-07-15',
})
