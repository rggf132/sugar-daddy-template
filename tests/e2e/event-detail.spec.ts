import { test, expect } from '@playwright/test'

test.describe('Event Detail Page', () => {
  test('should display event detail content', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(3000)

    const eventCards = page.locator('.MuiCard-root')
    if ((await eventCards.count()) === 0) {
      test.skip()
      return
    }

    await eventCards.first().click()
    await page.waitForURL(/\/events\/\d+/, { timeout: 10000 })

    const aboutSection = page.getByText('About this event')
    await expect(aboutSection).toBeVisible({ timeout: 10000 })
  })

  test('should show date and location info', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(3000)

    const eventCards = page.locator('.MuiCard-root')
    if ((await eventCards.count()) === 0) {
      test.skip()
      return
    }

    await eventCards.first().click()
    await page.waitForURL(/\/events\/\d+/, { timeout: 10000 })

    await page.waitForTimeout(2000)

    const dateTime = page.getByText('Date & Time')
    const hasDateTime = await dateTime.isVisible().catch(() => false)

    const location = page.getByText('Location')
    const hasLocation = await location.isVisible().catch(() => false)

    expect(hasDateTime || hasLocation).toBe(true)
  })

  test('should show event creator section', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(3000)

    const eventCards = page.locator('.MuiCard-root')
    if ((await eventCards.count()) === 0) {
      test.skip()
      return
    }

    await eventCards.first().click()
    await page.waitForURL(/\/events\/\d+/, { timeout: 10000 })

    const creator = page.getByText('Event Creator')
    await expect(creator).toBeVisible({ timeout: 10000 })
  })
})
