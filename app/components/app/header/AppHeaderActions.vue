<template>
  <div class="flex items-center gap-1">
    <UDropdownMenu :items="localeItems">
      <UButton
        color="neutral"
        variant="ghost"
        size="sm"
        trailing-icon="i-lucide-chevron-down"
        :aria-label="t('actions.changeLanguage')"
        :label="locale.toUpperCase()"
        :ui="{ label: 'font-mono text-xs' }"
      />
    </UDropdownMenu>

    <UColorModeButton :aria-label="t('actions.changeTheme')" />

    <UButton
      :to="repositoryUrl"
      :label="t('nav.repository')"
      :aria-label="t('actions.openRepository')"
      target="_blank"
      color="neutral"
      variant="ghost"
      size="sm"
      trailing-icon="i-lucide-arrow-up-right"
      :ui="{ label: 'font-mono text-xs' }"
      class="hidden sm:inline-flex"
    />
  </div>
</template>

<script setup lang="ts">
import type { DropdownMenuItem } from '@nuxt/ui'

const { t, locale, locales } = useI18n()
const switchLocalePath = useSwitchLocalePath()
const { public: { repositoryUrl } } = useRuntimeConfig()

const localeItems = computed<DropdownMenuItem[]>(() => locales.value.map(available => ({
  label: available.name ?? available.code,
  to: switchLocalePath(available.code),
  locale: false,
})))
</script>
