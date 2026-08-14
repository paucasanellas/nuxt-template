import type { Collections } from '@nuxt/content'

type StripLocale<CollectionName> = CollectionName extends `${infer Name}_en` ? Name : never

type PageName = StripLocale<keyof Collections>

function pageCollection(name: PageName, locale: string) {
  return `${name}_${locale}` as keyof Collections
}

export async function usePage<Name extends PageName>(name: Name) {
  const nuxtApp = useNuxtApp()
  const { locale } = useI18n()

  const { data } = await useAsyncData(
    () => `page-${name}-${locale.value}`,
    () => queryCollection(pageCollection(name, locale.value)).first(),
    { watch: [locale] },
  )

  if (!data.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }

  const page = data as Ref<Collections[`${Name}_en` & keyof Collections]>

  nuxtApp.runWithContext(() => useSeoMeta({
    title: () => page.value.title,
    description: () => page.value.description,
  }))

  return page
}
