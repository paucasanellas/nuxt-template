import type { Collections } from '@nuxt/content'

export const usePage = () => {
  async function fetch<Collection extends keyof Collections>(collection: Collection) {
    return await queryCollection(collection).first()
  }

  return {
    fetch,
  }
}
