import { test, expect } from '@playwright/test'

test.describe('Profile Page (Authenticated)', () => {
  test('should load the profile page', async ({ page }) => {
    await page.goto('/profile')
    await page.waitForLoadState('networkidle')

    await expect(page).toHaveURL('/profile')
  })

  test('should show user information', async ({ page }) => {
    await page.goto('/profile')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(3000)

    const aboutMe = page.getByText('About Me')
    const hasAboutMe = await aboutMe.isVisible().catch(() => false)

    const myEvents = page.getByText('My Events')
    const hasMyEvents = await myEvents.isVisible().catch(() => false)

    expect(hasAboutMe || hasMyEvents).toBe(true)
  })

  test('should show My Events section', async ({ page }) => {
    await page.goto('/profile')
    await page.waitForLoadState('networkidle')
    await page.waitForTimeout(3000)

    const myEvents = page.getByText('My Events')
    const hasMyEvents = await myEvents.isVisible().catch(() => false)

    const noEvents = page.getByText('No Events Yet')
    const hasNoEvents = await noEvents.isVisible().catch(() => false)

    expect(hasMyEvents || hasNoEvents).toBe(true)
  })
})
