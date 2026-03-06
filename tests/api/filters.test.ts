import { describe, it, expect } from 'vitest'
import { db } from 'db'
import { category, subCategory } from 'db/schema'
import 'lib/bigint-polyfill'

describe('Filters API - DB Layer', () => {
  it('should return categories from the database', async () => {
    const categories = await db.query.category.findMany()

    expect(Array.isArray(categories)).toBe(true)
    expect(categories.length).toBeGreaterThan(0)

    const cat = categories[0]
    expect(cat).toHaveProperty('id')
    expect(cat).toHaveProperty('type')
  })

  it('should return subcategories from the database', async () => {
    const subCategories = await db.query.subCategory.findMany()

    expect(Array.isArray(subCategories)).toBe(true)

    if (subCategories.length > 0) {
      const sub = subCategories[0]
      expect(sub).toHaveProperty('id')
      expect(sub).toHaveProperty('type')
      expect(sub).toHaveProperty('category_id')
    }
  })

  it('should have subcategories linked to valid categories', async () => {
    const categories = await db.select({ id: category.id }).from(category)
    const categoryIds = new Set(categories.map((c) => Number(c.id)))

    const subCategories = await db.query.subCategory.findMany()

    subCategories.forEach((sub) => {
      if (sub.category_id) {
        expect(categoryIds.has(Number(sub.category_id))).toBe(true)
      }
    })
  })
})
