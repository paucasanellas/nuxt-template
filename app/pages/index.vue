<template>
  <UPage>
    <UPageHero v-bind="page.hero" />

    <UPageSection
      id="stack"
      v-bind="page.stack"
    />

    <UPageSection
      id="conventions"
      v-bind="page.conventions"
    />

    <UPageSection
      id="start"
      v-bind="page.start"
    />

    <UContainer>
      <UPageCTA
        variant="subtle"
        v-bind="page.cta"
      />
    </UContainer>
  </UPage>
</template>

<script setup lang="ts">
const page = await usePage('home')
</script>
