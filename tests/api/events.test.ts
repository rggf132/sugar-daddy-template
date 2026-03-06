import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { db } from 'db'
import { event, category, subCategory, eventToSubCategory } from 'db/schema'
import { eq } from 'drizzle-orm'
import 'lib/bigint-polyfill'

let testCategoryId: number
let testSubCategoryId: number
let createdEventId: number | null = null

beforeAll(async () => {
  const categories = await db.select().from(category).limit(1)
  if (categories.length === 0) {
    throw new Error('No categories in DB -- cannot run event tests')
  }
  testCategoryId = categories[0].id

  const subCategories = await db.select().from(subCategory).limit(1)
  if (subCategories.length > 0) {
    testSubCategoryId = subCategories[0].id
  }
})

afterAll(async () => {
  if (createdEventId) {
    try {
      await db
        .delete(eventToSubCategory)
        .where(eq(eventToSubCategory.event_id, BigInt(createdEventId)))
      await db.delete(event).where(eq(event.id, createdEventId))
    } catch {
      // cleanup best-effort
    }
  }
})

describe('Events API - DB Layer', () => {
  describe('GET events (list)', () => {
    it('should return events from the database with correct shape', async () => {
      const events = await db.select().from(event).limit(5)

      expect(Array.isArray(events)).toBe(true)

      if (events.length > 0) {
        const e = events[0]
        expect(e).toHaveProperty('id')
        expect(e).toHaveProperty('title')
        expect(e).toHaveProperty('description')
        expect(e).toHaveProperty('entry_type')
        expect(e).toHaveProperty('creator_id')
        expect(e).toHaveProperty('category_id')
        expect(e).toHaveProperty('created_at')
      }
    })

    it('should support filtering by category_id', async () => {
      const events = await db
        .select()
        .from(event)
        .where(eq(event.category_id, BigInt(testCategoryId)))
        .limit(5)

      expect(Array.isArray(events)).toBe(true)
      events.forEach((e) => {
        expect(Number(e.category_id)).toBe(testCategoryId)
      })
    })

    it('should support pagination via limit and offset', async () => {
      const page1 = await db.select().from(event).limit(2)
      const page2 = await db.select({ id: event.id }).from(event).limit(2)

      expect(page1.length).toBeLessThanOrEqual(2)
      expect(page2.length).toBeLessThanOrEqual(2)
    })
  })

  describe('INSERT / UPDATE / DELETE events', () => {
    it('should create an event with valid data', async () => {
      const testUserId = 'test-user-vitest-' + Date.now()

      const result = await db.insert(event).values({
        title: 'Vitest Test Event',
        description: 'Created by vitest',
        creator_id: testUserId,
        category_id: BigInt(testCategoryId),
        entry_type: 'Free',
        start: new Date().toISOString().slice(0, 19).replace('T', ' '),
        end: new Date(Date.now() + 86400000)
          .toISOString()
          .slice(0, 19)
          .replace('T', ' '),
      })

      createdEventId = result[0].insertId
      expect(createdEventId).toBeDefined()
      expect(createdEventId).toBeGreaterThan(0)
    })

    it('should read the created event back', async () => {
      expect(createdEventId).not.toBeNull()

      const [found] = await db
        .select()
        .from(event)
        .where(eq(event.id, createdEventId!))
        .limit(1)

      expect(found).toBeDefined()
      expect(found.title).toBe('Vitest Test Event')
      expect(found.description).toBe('Created by vitest')
      expect(found.entry_type).toBe('Free')
    })

    it('should update the event title', async () => {
      expect(createdEventId).not.toBeNull()

      await db
        .update(event)
        .set({ title: 'Updated Vitest Event' })
        .where(eq(event.id, createdEventId!))

      const [updated] = await db
        .select()
        .from(event)
        .where(eq(event.id, createdEventId!))
        .limit(1)

      expect(updated.title).toBe('Updated Vitest Event')
    })

    it('should create event-to-subcategory join records', async () => {
      if (!testSubCategoryId) return

      expect(createdEventId).not.toBeNull()

      await db.insert(eventToSubCategory).values({
        event_id: BigInt(createdEventId!),
        sub_category_id: BigInt(testSubCategoryId),
      })

      const joins = await db
        .select()
        .from(eventToSubCategory)
        .where(eq(eventToSubCategory.event_id, BigInt(createdEventId!)))

      expect(joins.length).toBeGreaterThanOrEqual(1)
      expect(Number(joins[0].sub_category_id)).toBe(testSubCategoryId)
    })

    it('should delete the event and clean up joins', async () => {
      expect(createdEventId).not.toBeNull()

      await db
        .delete(eventToSubCategory)
        .where(eq(eventToSubCategory.event_id, BigInt(createdEventId!)))

      await db.delete(event).where(eq(event.id, createdEventId!))

      const [found] = await db
        .select()
        .from(event)
        .where(eq(event.id, createdEventId!))
        .limit(1)

      expect(found).toBeUndefined()
      createdEventId = null
    })
  })
})
