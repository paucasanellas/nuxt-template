import { defineCollection, defineContentConfig } from '@nuxt/content'

import { home } from './shared/schemas/home'

export default defineContentConfig({
  collections: {
    home_en: defineCollection({
      type: 'page',
      source: 'en/pages/home.yml',
      schema: home,
    }),
    home_es: defineCollection({
      type: 'page',
      source: 'es/pages/home.yml',
      schema: home,
    }),
  },
})
