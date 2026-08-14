<template>
  <UPageHero
    v-if="hero"
    :ui="{
      container: 'py-20 sm:py-28 lg:py-32',
      wrapper: 'max-w-4xl text-left',
      headline: 'mb-6',
      title: () => 'type-display font-display text-pretty text-highlighted',
      description: 'mt-6 max-w-2xl text-lg text-muted sm:text-xl/8',
      body: 'mt-12',
      footer: 'mt-12',
    }"
  >
    <template #headline>
      <span class="font-mono type-eyebrow text-dimmed">{{ hero.root }}</span>
    </template>

    <template #title>
      {{ hero.title }}
    </template>

    <template #description>
      {{ hero.lede }}
    </template>

    <template #body>
      <HomeHeroTree :entries="hero.tree" />
    </template>

    <template #footer>
      <HomeHeroActions
        :actions="hero.actions"
        :hint="hero.hint"
      />
    </template>
  </UPageHero>
</template>

<script setup lang="ts">
const { data } = await useHomeContent()

const hero = computed(() => data.value?.hero)
</script>
