import { test, expect } from '@playwright/test'

test.describe('Home Page', () => {
  test('should load the home page', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL('/')
  })

  test('should show the sidebar with app name', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const appName = page.getByText('Events Hub')
    await expect(appName.first()).toBeVisible({ timeout: 10000 })
  })

  test('should show the search input', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    const searchInput = page.getByPlaceholder('Search events...')
    await expect(searchInput).toBeVisible({ timeout: 10000 })
  })

  test('should render event cards or empty state', async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(3000)

    const eventCards = page.locator('.MuiCard-root')
    const noEvents = page.getByText('No events found')

    const hasCards = (await eventCards.count()) > 0
    const hasEmpty = await noEvents.isVisible().catch(() => false)

    expect(hasCards || hasEmpty).toBe(true)
  })

  test('should navigate to event detail when clicking a card', async ({
    page,
  }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')

    await page.waitForTimeout(3000)

    const eventCards = page.locator('.MuiCard-root')
    if ((await eventCards.count()) > 0) {
      await eventCards.first().click()
      await page.waitForURL(/\/events\/\d+/, { timeout: 10000 })
      await expect(page).toHaveURL(/\/events\/\d+/)
    }
  })
})
