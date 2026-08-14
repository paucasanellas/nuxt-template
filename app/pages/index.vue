<template>
  <UPage v-if="page">
    <UPageHero v-bind="heroProps">
      <template #headline>
        <UBadge
          color="secondary"
          variant="subtle"
          class="font-mono"
        >
          v{{ version }}
        </UBadge>
      </template>

      <template
        v-if="heroTitle"
        #title
      >
        {{ heroTitle.before }}<span class="text-secondary">{{ heroTitle.highlight }}</span>{{ heroTitle.after }}
      </template>
    </UPageHero>

    <UPageSection
      id="stack"
      v-bind="page.stack"
    />

    <UPageSection
      id="content"
      v-bind="page.content"
      :ui="{ headline: 'before:bg-secondary', features: 'lg:grid-cols-2' }"
    />

    <UPageSection
      id="backend"
      v-bind="page.backend"
      :ui="{ features: 'lg:grid-cols-2' }"
    />

    <UPageSection
      id="i18n"
      v-bind="page.i18n"
      :ui="{ headline: 'before:bg-secondary', features: 'lg:grid-cols-2' }"
    />

    <UPageSection
      id="start"
      v-bind="page.start"
    />

    <UContainer class="pb-16 sm:pb-20 lg:pb-24">
      <UPageCTA
        variant="subtle"
        v-bind="page.cta"
      />
    </UContainer>
  </UPage>
</template>

<script setup lang="ts">
const { locale } = useI18n()
const { public: { version } } = useRuntimeConfig()
const { fetch: fetchPage } = usePage()

const { data: page } = await useAsyncData(
  () => `page-home-${locale.value}`,
  () => fetchPage(`home_${locale.value}`),
  { watch: [locale] },
)

if (!page.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

const heroProps = computed(() => {
  if (!page.value) {
    return {}
  }

  const { highlight, ...props } = page.value.hero

  return props
})

const heroTitle = computed(() => {
  const hero = page.value?.hero

  if (!hero?.highlight) {
    return null
  }

  const startIndex = hero.title.indexOf(hero.highlight)

  if (startIndex === -1) {
    return null
  }

  return {
    before: hero.title.slice(0, startIndex),
    highlight: hero.highlight,
    after: hero.title.slice(startIndex + hero.highlight.length),
  }
})

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})
</script>
