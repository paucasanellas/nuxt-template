<template>
  <span class="flex items-center gap-2 font-mono type-eyebrow text-dimmed">
    <span
      class="size-1.5 shrink-0 bg-primary"
      aria-hidden="true"
    />
    {{ label }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  label: string
}>()
</script>
