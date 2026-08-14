<template>
  <div class="flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
    <UButton
      v-for="action in actions"
      :key="action.to"
      :to="action.to"
      :label="action.label"
      target="_blank"
      size="xl"
      trailing-icon="i-lucide-arrow-up-right"
      class="self-start"
    />

    <p class="font-mono text-xs text-dimmed">
      {{ hint }}
    </p>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  actions: Array<{ label: string, to: string }>
  hint: string
}>()
</script>
