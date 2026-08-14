<template>
  <UFooter :ui="{ root: 'border-t border-default' }">
    <template #left>
      <p class="text-sm text-muted">
        {{ t('footer.rights') }}
      </p>
    </template>

    <AppFooterLinks />

    <template #right>
      <p class="font-mono text-xs text-dimmed">
        {{ t('footer.version', { version }) }}
      </p>
    </template>
  </UFooter>
</template>

<script setup lang="ts">
const { t } = useI18n()
const { public: { version } } = useRuntimeConfig()
</script>
