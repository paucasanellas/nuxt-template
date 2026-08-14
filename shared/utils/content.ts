import type { PageCollections } from '@nuxt/content'

type PageCollection = Extract<keyof PageCollections, `pages_${string}`>

export function pageCollection(locale: string) {
  return `pages_${locale}` as PageCollection
}

export function contentPath(slug: string | string[] | undefined) {
  const segments = [slug ?? []].flat().filter(Boolean)

  return `/${segments.join('/')}`
}

export function pathSegments(path: string) {
  return path.split('/').filter(Boolean)
}
