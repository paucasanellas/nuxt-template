<template>
  <div class="flex min-h-screen flex-col">
    <AppHeader />

    <UMain class="flex-1">
      <UContainer>
        <slot />
      </UContainer>
    </UMain>

    <AppFooter />
  </div>
</template>
