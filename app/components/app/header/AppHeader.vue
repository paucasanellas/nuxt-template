<template>
  <UHeader
    :to="localePath('/')"
    :title="t('app.name')"
    :ui="{ root: 'border-b border-default bg-default/80 backdrop-blur' }"
  >
    <template #title>
      <AppHeaderLogo />
    </template>

    <AppHeaderNav />

    <template #right>
      <AppHeaderActions />
    </template>

    <template #body>
      <AppHeaderNav orientation="vertical" />
    </template>
  </UHeader>
</template>

<script setup lang="ts">
const { t } = useI18n()
const localePath = useLocalePath()
</script>
