export function useHomeContent() {
  const { locale } = useI18n()

  return useAsyncData(
    () => `home-${locale.value}`,
    () => locale.value === 'es'
      ? queryCollection('home_es').first()
      : queryCollection('home_en').first(),
    { watch: [locale] },
  )
}
