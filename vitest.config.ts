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
          name: 'server',
          globals: true,
          setupFiles: ['./tests/vitest.server.ts'],
          include: ['server/api/**/*.{test,spec}.ts'],
          environment: 'node',
        },
      },
      await defineVitestProject({
        test: {
          name: 'nuxt',
          globals: true,
          setupFiles: ['./tests/vitest.nuxt.ts'],
          include: [
            'app/**/*.{test,spec}.ts',
          ],
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
