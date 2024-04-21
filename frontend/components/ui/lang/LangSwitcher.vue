<template>
  <USelectMenu
    v-model="currentLocale"
    :options="locales"
    variant="none"
    :ui-menu="{ width: 'w-32' }"
    class="-mr-2"
  >
    <template #label>
      <UIcon name="i-heroicons-language" class="text-xl" />
    </template>
    <template #option="{ option: language }">
      <span class="truncate">{{ language.name }}</span>
    </template>
  </USelectMenu>
</template>

<script setup lang="ts">
import type { Locale } from '~/types'

const emit = defineEmits(['update'])

const props = defineProps({
  locales: {
    type: Array as PropType<Locale[]>,
    required: true
  },
  locale: {
    type: String,
    required: true
  }
})

const currentLocale = computed({
  get: () => props.locales.find(language => language.code === props.locale),
  set: (language) => {
    emit('update', language)
  }
})
</script>
