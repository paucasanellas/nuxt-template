<template>
  <UPageSection
    v-if="conventions"
    id="conventions"
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
      <HomeSectionEyebrow :label="conventions.eyebrow" />
    </template>

    <template #title>
      {{ conventions.title }}
    </template>

    <template #description>
      {{ conventions.lede }}
    </template>

    <template #body>
      <dl class="max-w-4xl divide-y divide-default border-y border-default">
        <HomeConventionsLayer
          v-for="layer in conventions.layers"
          :key="layer.path"
          :role="layer.role"
          :path="layer.path"
          :note="layer.note"
        />
      </dl>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
const { data } = await useHomeContent()

const conventions = computed(() => data.value?.conventions)
</script>
