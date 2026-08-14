<template>
  <UPageSection
    v-if="start"
    id="start"
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
      <HomeSectionEyebrow :label="start.eyebrow" />
    </template>

    <template #title>
      {{ start.title }}
    </template>

    <template #description>
      {{ start.lede }}
    </template>

    <template #body>
      <ol class="max-w-3xl">
        <HomeStartStep
          v-for="(step, index) in start.steps"
          :key="step.command"
          :position="index + 1"
          :command="step.command"
          :note="step.note"
        />
      </ol>
    </template>
  </UPageSection>
</template>

<script setup lang="ts">
const { data } = await useHomeContent()

const start = computed(() => data.value?.start)
</script>
