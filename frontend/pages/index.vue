<template>
  <main>
    <h1 class="font-display">
      {{ $t('home.title') }} (v{{ version }}) ({{ name }})
    </h1>
  </main>
</template>

<script lang="ts" setup>
const { t } = useI18n()

const { state: { name, version } } = useAppStore()
useSeoMeta({
  title: t('home.title')
})
</script>
