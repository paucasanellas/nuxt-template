<template>
  <ul class="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
    <li
      v-for="link in links"
      :key="link.to"
    >
      <ULink
        :to="link.to"
        target="_blank"
        class="font-mono text-xs text-muted transition-colors hover:text-highlighted"
      >
        {{ link.label }}
      </ULink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { public: { repositoryUrl } } = useRuntimeConfig()

const links = computed(() => [
  { label: t('footer.links.nuxt'), to: 'https://nuxt.com/docs' },
  { label: t('footer.links.ui'), to: 'https://ui.nuxt.com' },
  { label: t('nav.repository'), to: repositoryUrl },
])
</script>
