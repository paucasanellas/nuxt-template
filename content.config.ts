import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const action = z.object({
  label: z.string(),
  to: z.string(),
})

const homeSchema = z.object({
  hero: z.object({
    root: z.string(),
    title: z.string(),
    lede: z.string(),
    tree: z.array(z.object({
      path: z.string(),
      note: z.string(),
    })),
    actions: z.array(action),
    hint: z.string(),
  }),
  stack: z.object({
    eyebrow: z.string(),
    title: z.string(),
    lede: z.string(),
    items: z.array(z.object({
      name: z.string(),
      note: z.string(),
    })),
  }),
  conventions: z.object({
    eyebrow: z.string(),
    title: z.string(),
    lede: z.string(),
    layers: z.array(z.object({
      role: z.string(),
      path: z.string(),
      note: z.string(),
    })),
  }),
  start: z.object({
    eyebrow: z.string(),
    title: z.string(),
    lede: z.string(),
    steps: z.array(z.object({
      command: z.string(),
      note: z.string(),
    })),
  }),
  cta: z.object({
    title: z.string(),
    description: z.string(),
    actions: z.array(action),
  }),
})

export default defineContentConfig({
  collections: {
    home_en: defineCollection({
      type: 'data',
      source: 'en/index.yml',
      schema: homeSchema,
    }),
    home_es: defineCollection({
      type: 'data',
      source: 'es/index.yml',
      schema: homeSchema,
    }),
  },
})
