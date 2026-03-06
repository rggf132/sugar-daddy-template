import { test, expect } from '@playwright/test'

test.describe('Stripe Page', () => {
  test('should load the stripe test page', async ({ page }) => {
    await page.goto('/stripe')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL('/stripe')
  })

  test('should show payment type selection', async ({ page }) => {
    await page.goto('/stripe')
    await page.waitForLoadState('networkidle')

    const oneTime = page.getByText('One-time Payment')
    const subscription = page.getByText('Subscription')

    const hasOneTime = await oneTime.isVisible().catch(() => false)
    const hasSubscription = await subscription.isVisible().catch(() => false)

    expect(hasOneTime || hasSubscription).toBe(true)
  })

  test('should show payment amount controls', async ({ page }) => {
    await page.goto('/stripe')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(2000)

    const amountInput = page.locator('input[type="number"]')
    const hasAmountInput = (await amountInput.count()) > 0

    const payButton = page.getByRole('button').filter({ hasText: /pay|create/i })
    const hasPayButton = (await payButton.count()) > 0

    expect(hasAmountInput || hasPayButton).toBe(true)
  })
})
