<template>
  <li class="grid grid-cols-[1.5rem_1fr] gap-x-4 gap-y-2 py-4">
    <span class="pt-0.5 font-mono type-eyebrow text-dimmed">
      {{ position }}
    </span>

    <div class="min-w-0">
      <code class="font-mono text-sm font-medium break-all text-highlighted">
        {{ command }}
      </code>
      <p class="mt-2 text-[15px]/relaxed text-muted">
        {{ note }}
      </p>
    </div>
  </li>
</template>

<script setup lang="ts">
defineProps<{
  position: number
  command: string
  note: string
}>()
</script>
