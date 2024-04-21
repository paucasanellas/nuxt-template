import { defineVitestConfig } from '@nuxt/test-utils/config'

export default defineVitestConfig({
  test: {
    setupFiles: ['./vitest.setup.ts'],
    environment: 'nuxt',
    globals: true
  }
})
