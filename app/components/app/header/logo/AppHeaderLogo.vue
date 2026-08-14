<template>
  <span class="flex items-center gap-2.5">
    <span
      class="size-2 bg-primary"
      aria-hidden="true"
    />
    <span class="font-mono text-sm font-medium tracking-tight text-highlighted">
      {{ t('app.name') }}
    </span>
  </span>
</template>

<script setup lang="ts">
const { t } = useI18n()
</script>
