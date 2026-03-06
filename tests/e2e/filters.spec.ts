import { test, expect } from '@playwright/test'

test.describe('Filters', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(2000)
  })

  test('should filter events by search term', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search events...')
    await expect(searchInput).toBeVisible({ timeout: 10000 })

    await searchInput.fill('test')

    await page.waitForURL(/[?&]searchTerm=test/, { timeout: 10000 })

    const url = new URL(page.url())
    expect(url.searchParams.get('searchTerm')).toBe('test')
  })

  test('should show sidebar filters on desktop', async ({ page }) => {
    const viewport = page.viewportSize()
    if (!viewport || viewport.width < 900) {
      test.skip()
      return
    }

    const filtersHeading = page.getByText('Filters')
    await expect(filtersHeading.first()).toBeVisible({ timeout: 10000 })
  })

  test('should have category filter available', async ({ page }) => {
    const viewport = page.viewportSize()
    if (!viewport || viewport.width < 900) {
      const filterButton = page.getByRole('button').filter({ hasText: /filter/i })
      if (await filterButton.isVisible().catch(() => false)) {
        await filterButton.click()
        await page.waitForTimeout(500)
      }
    }

    const categoryFilter = page.getByText('Category')
    await expect(categoryFilter.first()).toBeVisible({ timeout: 10000 })
  })

  test('should clear search when input is emptied', async ({ page }) => {
    const searchInput = page.getByPlaceholder('Search events...')
    await searchInput.fill('test')
    await page.waitForTimeout(1500)

    await searchInput.clear()
    await page.waitForTimeout(1500)

    const url = new URL(page.url())
    expect(url.searchParams.has('searchTerm')).toBe(false)
  })
})
