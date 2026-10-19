<template>
  <UPage />
</template>

<script setup lang="ts">
const { t } = useI18n()

definePageMeta({
  i18n: {
    paths: {
      en: '/',
    },
  },
})

useHead(() => ({
  title: t('home.meta.title'),
}))
</script>
