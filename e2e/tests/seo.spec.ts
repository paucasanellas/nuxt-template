import { expect, test } from '@playwright/test'

test('should have the correct lang attribute', async ({ page }) => {
  await page.goto('/')
  const lang = await page.getAttribute('html', 'lang')
  expect(lang).toBe('en')
})
