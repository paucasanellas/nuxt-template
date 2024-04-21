<template>
  <div>
    <LangSwitcher
      :locale="locale"
      :locales="locales"
      @update="changeLocale"
    />
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { Locale } from '@/types'

const localeRoute = useLocaleRoute()
const { locale, locales } = useI18n()

const changeLocale = (language: Locale) => {
  navigateTo(localeRoute('index', language.code))
}
</script>
