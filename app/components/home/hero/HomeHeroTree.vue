<template>
  <ul class="max-w-3xl">
    <li
      v-for="(entry, index) in entries"
      :key="entry.path"
      :style="{ '--reveal-index': index }"
      class="reveal-up group grid gap-x-8 gap-y-1 py-2.5 sm:grid-cols-[minmax(0,10rem)_1fr]"
    >
      <span class="flex items-baseline gap-2 font-mono text-sm">
        <span
          class="select-none text-dimmed"
          aria-hidden="true"
        >{{ index === entries.length - 1 ? '└──' : '├──' }}</span>
        <span class="font-medium text-highlighted transition-colors group-hover:text-primary">
          {{ entry.path }}
        </span>
      </span>

      <span class="ps-8 text-[15px]/relaxed text-muted sm:ps-0">
        {{ entry.note }}
      </span>
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{
  entries: Array<{ path: string, note: string }>
}>()
</script>
