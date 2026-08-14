export async function usePage() {
  const { locale, locales } = useI18n()
  const route = useRoute()
  const setI18nParams = useSetI18nParams()

  const path = computed(() => contentPath(route.params.slug))

  const { data: page } = await useAsyncData(
    () => `page-${locale.value}-${path.value}`,
    () => queryCollection(pageCollection(locale.value)).path(path.value).first(),
    { watch: [locale, path] },
  )

  if (!page.value) {
    throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
  }

  const stem = page.value.stem

  const siblings = await Promise.all(locales.value.map(async available => [
    available.code,
    await queryCollection(pageCollection(available.code)).where('stem', '=', stem).first(),
  ] as const))

  setI18nParams(Object.fromEntries(
    siblings
      .filter(([, sibling]) => sibling)
      .map(([code, sibling]) => [code, { slug: pathSegments(sibling!.path) }]),
  ))

  return page
}
