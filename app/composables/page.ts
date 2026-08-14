import type { Collections } from '@nuxt/content'

type Pages = {
  [Collection in keyof Collections as Collection extends `${infer Name}_en` ? Name : never]: Collections[Collection]
}

export const usePage = () => {
  async function fetch<Name extends keyof Pages>(name: Name, locale: string) {
    const collection = `${name}_${locale}` as keyof Collections

    return await queryCollection(collection).first() as Pages[Name] | null
  }

  return {
    fetch,
  }
}
