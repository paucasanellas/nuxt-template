<template>
  <UApp :locale="uiLocale">
    <NuxtRouteAnnouncer />
    <NuxtLoadingIndicator />
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </UApp>
</template>

<script setup lang="ts">
import { en, es } from '@nuxt/ui/locale'

const { locale, t } = useI18n()
const localeHead = useLocaleHead()

const uiLocale = computed(() => locale.value === 'es' ? es : en)

useHead(() => ({
  htmlAttrs: localeHead.value.htmlAttrs,
  link: localeHead.value.link,
  meta: localeHead.value.meta,
  titleTemplate: `%s · ${t('app.name')}`,
}))

useSeoMeta({
  title: () => t('app.tagline'),
  description: () => t('app.tagline'),
})
</script>
