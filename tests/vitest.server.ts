import { setup } from '@nuxt/test-utils/e2e'
import { beforeAll } from 'vitest'

beforeAll(async () => {
  await setup({
    host: 'http://localhost:8787',
  })
})
