<template>
  <UPage>
    <ContentRenderer
      v-if="page"
      :value="page"
    />
  </UPage>
</template>

<script setup lang="ts">
const page = await usePage()

useSeoMeta({
  title: () => page.value?.title,
  description: () => page.value?.description,
})
</script>
