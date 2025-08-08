import { defineVitestProject } from '@nuxt/test-utils/config'
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    coverage: {
      provider: 'v8',
      reportsDirectory: './tests/unit/coverage',
    },
    projects: [
      {
        test: {
          name: 'unit',
          globals: true,
          include: ['tests/{unit}/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          globals: true,
          setupFiles: ['./vitest.setup.ts'],
          include: ['app/**/*.{test,spec}.ts'],
          environment: 'nuxt',
          environmentOptions: {
            nuxt: {
              domEnvironment: 'happy-dom',
            },
          },
        },
      }),
    ],
  },
})
