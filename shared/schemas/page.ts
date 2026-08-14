import { z } from '@nuxt/content'

export const Button = z.object({
  label: z.string(),
  icon: z.string().optional(),
  trailingIcon: z.string().optional(),
  to: z.string().optional(),
  target: z.enum(['_blank', '_self']).optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
})

export const PageFeature = z.object({
  title: z.string(),
  description: z.string().optional(),
  icon: z.string().optional(),
})

export const PageHero = z.object({
  headline: z.string().optional(),
  title: z.string(),
  description: z.string(),
  links: z.array(Button).optional(),
})

export const PageSection = z.object({
  headline: z.string().optional(),
  title: z.string(),
  description: z.string().optional(),
  links: z.array(Button).optional(),
  features: z.array(PageFeature).optional(),
})

export const Page = z.object({
  title: z.string(),
  description: z.string(),
  hero: PageHero,
})
