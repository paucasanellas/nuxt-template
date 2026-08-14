<template>
  <UPage v-if="page">
    <UPageHero v-bind="page.hero" />

    <UPageSection
      id="stack"
      v-bind="page.stack"
    />

    <UPageSection
      id="conventions"
      v-bind="page.conventions"
    />

    <UPageSection
      id="start"
      v-bind="page.start"
    />

    <UContainer>
      <UPageCTA
        variant="subtle"
        v-bind="page.cta"
      />
    </UContainer>
  </UPage>
</template>

<script setup lang="ts">
const { locale } = useI18n()

const { data: page } = await useAsyncData(
  () => `page-home-${locale.value}`,
  () => fetchPage('home', locale.value),
  { watch: [locale] },
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})
</script>
