import { defineConfig, devices } from '@playwright/test'
import type { ConfigOptions } from '@nuxt/test-utils/playwright'

const devicesToTest = [
  'Desktop Chrome',
  'iPhone 12'
] satisfies Array<string | typeof devices[string]>

export default defineConfig<ConfigOptions>({
  testDir: './e2e/tests',
  fullyParallel: true,
  reporter: 'null',
  outputDir: './e2e/reports',
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry'
  },
  projects: devicesToTest.map(p => typeof p === 'string' ? ({ name: p, use: devices[p] }) : p)
})
