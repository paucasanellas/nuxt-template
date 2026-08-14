import type { Collections } from '@nuxt/content'

type StripLocale<CollectionName> = CollectionName extends `${infer Name}_en` ? Name : never

type PageName = StripLocale<keyof Collections>

type PageOf<Name extends PageName> = Collections[`${Name}_en` & keyof Collections]

export function fetchPage<Name extends PageName>(name: Name, locale: string) {
  const collection = `${name}_${locale}` as keyof Collections

  return queryCollection(collection).first() as Promise<PageOf<Name> | null>
}
