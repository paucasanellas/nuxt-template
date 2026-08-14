<template>
  <UPageCard
    variant="outline"
    :ui="{
      title: 'font-mono text-sm font-medium text-highlighted',
      description: 'mt-2.5 text-[13px]/relaxed text-muted',
    }"
  >
    <template #title>
      {{ name }}
    </template>

    <template #description>
      {{ note }}
    </template>
  </UPageCard>
</template>

<script setup lang="ts">
defineProps<{
  name: string
  note: string
}>()
</script>
