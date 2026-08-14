import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const pageSchema = z.object({
  title: z.string(),
  description: z.string(),
})

export default defineContentConfig({
  collections: {
    pages_en: defineCollection({
      type: 'page',
      source: { include: '**/*.md', cwd: 'content/en/pages', prefix: '/' },
      schema: pageSchema,
    }),
    pages_es: defineCollection({
      type: 'page',
      source: { include: '**/*.md', cwd: 'content/es/pages', prefix: '/' },
      schema: pageSchema,
    }),
  },
})
