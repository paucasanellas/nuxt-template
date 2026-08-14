<template>
  <UPageSection
    v-if="stack"
    id="stack"
    class="scroll-mt-20"
    :ui="{
      container: 'py-16 sm:py-20 lg:py-24',
      header: 'max-w-3xl',
      headline: 'mb-5 justify-start',
      title: () => 'type-title font-display text-pretty text-highlighted',
      description: 'mt-5 text-left text-base text-muted sm:text-lg',
      body: 'mt-12',
    }"
  >
    <template #headline>
      <HomeSectionEyebrow :label="stack.eyebrow" />
    </template>

    <template #title>
      {{ stack.title }}
    </template>

    <template #description>
      {{ stack.lede }}
    </template>

    <template #body>
      <UPageGrid>
        <HomeStackCard
          v-for="item in stack.items"
          :key="item.name"
          :name="item.name"
          :note="item.note"
        />
      </UPageGrid>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
const { data } = await useHomeContent()

const stack = computed(() => data.value?.stack)
</script>
