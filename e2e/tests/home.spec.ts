import { expect, test } from '@playwright/test'

test('should display the home heading with the app name', async ({ page }) => {
  await page.goto('/')
  await expect(page.getByRole('heading')).toHaveText('Home (v1.0.0) (My App)')
})
