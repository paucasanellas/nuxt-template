<template>
  <div class="grid gap-x-8 gap-y-2 py-6 sm:grid-cols-[8rem_1fr]">
    <dt class="font-mono type-eyebrow text-dimmed">
      {{ role }}
    </dt>

    <dd class="min-w-0">
      <p class="font-mono text-sm font-medium break-all text-highlighted">
        {{ path }}
      </p>
      <p class="mt-2 text-[15px]/relaxed text-muted">
        {{ note }}
      </p>
    </dd>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  role: string
  path: string
  note: string
}>()
</script>
