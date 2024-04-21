<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script lang="ts" setup>
const { locale } = useI18n()
const config = useAppConfig()

useSeoMeta({
  titleTemplate: `%s - ${config.app.name}`
})

const head = useLocaleHead({
  addDirAttribute: true,
  identifierAttribute: 'id',
  addSeoAttributes: true
})

useHead({
  htmlAttrs: {
    lang: head.value.htmlAttrs.lang,
    class: 'scroll-smooth'
  }
})

await callOnce(async () => {
  // Fetch store on app load
})

watch(locale, async () => {
  // Fetch store on locale change
})
</script>
