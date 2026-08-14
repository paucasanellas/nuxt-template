<template>
  <UNavigationMenu
    :items="items"
    :orientation="orientation"
    :ui="{ link: 'font-mono text-xs' }"
  />
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from '@nuxt/ui'

const { orientation = 'horizontal' } = defineProps<{
  orientation?: 'horizontal' | 'vertical'
}>()

const { t } = useI18n()
const { public: { repositoryUrl } } = useRuntimeConfig()

const items = computed<NavigationMenuItem[]>(() => [
  { label: t('nav.stack'), to: '#stack' },
  { label: t('nav.conventions'), to: '#conventions' },
  { label: t('nav.start'), to: '#start' },
  ...orientation === 'vertical'
    ? [{
        label: t('nav.repository'),
        to: repositoryUrl,
        target: '_blank',
        trailingIcon: 'i-lucide-arrow-up-right',
      }]
    : [],
])
</script>
