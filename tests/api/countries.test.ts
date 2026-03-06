import { describe, it, expect } from 'vitest'
import { db } from 'db'
import { country, city } from 'db/schema'
import { eq, like, asc } from 'drizzle-orm'
import 'lib/bigint-polyfill'

describe('Countries API - DB Layer', () => {
  it('should return countries from the database', async () => {
    const countries = await db
      .select()
      .from(country)
      .orderBy(asc(country.name))
      .limit(50)

    expect(Array.isArray(countries)).toBe(true)
    expect(countries.length).toBeGreaterThan(0)

    const c = countries[0]
    expect(c).toHaveProperty('id')
    expect(c).toHaveProperty('name')
    expect(typeof c.name).toBe('string')
  })

  it('should support search filtering on countries', async () => {
    const results = await db
      .select()
      .from(country)
      .where(like(country.name, '%United%'))
      .limit(10)

    expect(Array.isArray(results)).toBe(true)
    results.forEach((c) => {
      expect(c.name.toLowerCase()).toContain('united')
    })
  })

  it('should return cities for a given country', async () => {
    const [firstCountry] = await db.select().from(country).limit(1)
    if (!firstCountry) return

    const cities = await db
      .select()
      .from(city)
      .where(eq(city.country_id, BigInt(firstCountry.id)))
      .orderBy(asc(city.name))
      .limit(20)

    expect(Array.isArray(cities)).toBe(true)

    if (cities.length > 0) {
      const c = cities[0]
      expect(c).toHaveProperty('id')
      expect(c).toHaveProperty('name')
      expect(c).toHaveProperty('country_id')
      expect(Number(c.country_id)).toBe(firstCountry.id)
    }
  })

  it('should support search filtering on cities', async () => {
    const [firstCountry] = await db.select().from(country).limit(1)
    if (!firstCountry) return

    const [firstCity] = await db
      .select()
      .from(city)
      .where(eq(city.country_id, BigInt(firstCountry.id)))
      .limit(1)

    if (!firstCity) return

    const searchTerm = firstCity.name.slice(0, 3)
    const results = await db
      .select()
      .from(city)
      .where(
        like(city.name, `%${searchTerm}%`),
      )
      .limit(10)

    expect(results.length).toBeGreaterThan(0)
  })

  it('should return city by ID with country info', async () => {
    const [firstCity] = await db.select().from(city).limit(1)
    if (!firstCity) return

    const result = await db
      .select({
        id: city.id,
        name: city.name,
        country_id: city.country_id,
        country_name: country.name,
      })
      .from(city)
      .leftJoin(country, eq(city.country_id, country.id))
      .where(eq(city.id, firstCity.id))
      .limit(1)

    expect(result.length).toBe(1)
    expect(result[0].id).toBe(firstCity.id)
    expect(result[0].country_name).toBeTruthy()
  })
})
