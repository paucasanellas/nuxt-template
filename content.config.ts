import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const Button = z.object({
  label: z.string(),
  icon: z.string().optional(),
  trailingIcon: z.string().optional(),
  to: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
})

const PageFeature = z.object({
  title: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
})

const PageHero = z.object({
  headline: z.string().optional(),
  title: z.string(),
  description: z.string(),
  links: z.array(Button).optional(),
})

const PageSection = z.object({
  headline: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  links: z.array(Button).optional(),
  features: z.array(PageFeature).optional(),
})

const Page = z.object({
  title: z.string(),
  description: z.string(),
  hero: PageHero,
})

const home = Page.extend({
  stack: PageSection,
  conventions: PageSection,
  start: PageSection,
  cta: PageSection,
})

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
