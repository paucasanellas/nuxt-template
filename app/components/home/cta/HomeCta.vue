<template>
  <UContainer
    v-if="cta"
    class="pb-20 sm:pb-28 lg:pb-32"
  >
    <UPageCTA
      variant="subtle"
      :links="links"
      :ui="{
        container: 'px-6 py-12 sm:px-10 sm:py-16 lg:px-12 lg:py-20',
        wrapper: 'max-w-3xl',
        title: () => 'type-title font-display text-pretty text-highlighted',
        description: 'mt-5 text-left text-pretty text-base text-muted sm:text-lg',
        footer: 'mt-10',
        links: 'justify-start',
      }"
    >
      <template #title>
        {{ cta.title }}
      </template>

      <template #description>
        {{ cta.description }}
      </template>
    </UPageCTA>
  </UContainer>
</template>

<script setup lang="ts">
import type { ButtonProps } from '@nuxt/ui'

const { data } = await useHomeContent()

const cta = computed(() => data.value?.cta)

const links = computed<ButtonProps[]>(() => (cta.value?.actions ?? []).map((action, index) => ({
  label: action.label,
  to: action.to,
  target: '_blank',
  color: index === 0 ? 'primary' : 'neutral',
  variant: index === 0 ? 'solid' : 'ghost',
  trailingIcon: 'i-lucide-arrow-up-right',
})))
</script>
