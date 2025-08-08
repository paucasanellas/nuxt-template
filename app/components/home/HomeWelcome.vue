<template>
  <section class="grid place-items-center min-h-dvh">
    <div class="grid gap-4 justify-items-center">
      <h1 class="text-4xl font-bold">
        {{ $t('home.welcome.title', { name }) }}
      </h1>
      <UBadge
        size="xl"
        variant="subtle"
        aria-label="Actual template version"
        :label="version"
      />
    </div>
  </section>
</template>

<script lang="ts" setup>
const { app: { name, version } } = useAppConfig()
</script>
