import { NextResponse } from 'next/server'
import { db } from '../../../../../../db'
import { country, city } from '../../../../../../db/schema'
import { eq, like, and, asc } from 'drizzle-orm'
import 'lib/bigint-polyfill'

export async function GET(
  req: Request,
  { params }: { params: { country: string } },
) {
  const countryName = decodeURIComponent(params.country)
  const { searchParams } = new URL(req.url)
  const searchTerm = searchParams.get('search')
  const cityId = searchParams.get('cityId')
  const limit = Math.min(Number(searchParams.get('limit')) || 50, 100) // Max 100 results

  try {
    let cities = []
    let foundCountryId: number = 0

    // If we have a cityId, find the city first to get its country
    if (cityId) {
      const foundCity = await db
        .select({
          id: city.id,
          name: city.name,
          country_id: city.country_id,
        })
        .from(city)
        .where(eq(city.id, Number(cityId)))
        .limit(1)

      if (foundCity.length > 0) {
        foundCountryId = Number(foundCity[0].country_id)

        // If we also have a country name, verify it matches (but allow placeholder)
        if (
          countryName !== 'undefined' &&
          countryName !== 'null' &&
          countryName !== 'placeholder'
        ) {
          const foundCountry = await db
            .select()
            .from(country)
            .where(eq(country.id, foundCountryId))
            .limit(1)

          if (!foundCountry.length || foundCountry[0].name !== countryName) {
            return NextResponse.json(
              { error: 'Country mismatch' },
              { status: 400 },
            )
          }
        }
      }
    } else {
      // No cityId provided, find the country by name
      const found = await db
        .select()
        .from(country)
        .where(eq(country.name, countryName))
        .limit(1)

      if (!found.length) {
        return NextResponse.json(
          { error: 'Country not found' },
          { status: 404 },
        )
      }

      foundCountryId = found[0].id
    }

    if (searchTerm) {
      // Search cities within country with limit
      cities = await db
        .select()
        .from(city)
        .where(
          and(
            eq(city.country_id, BigInt(foundCountryId)),
            like(city.name, `%${searchTerm}%`),
          ),
        )
        .orderBy(asc(city.name))
        .limit(limit)
    } else {
      // Return cities for country with limit
      cities = await db
        .select()
        .from(city)
        .where(eq(city.country_id, BigInt(foundCountryId)))
        .orderBy(asc(city.name))
        .limit(limit)
    }

    // If cityId parameter is provided, ensure the specific city is included
    if (cityId) {
      // Get the first 20 cities
      const first20Cities = cities.slice(0, 20)

      // Find the specific city by cityId
      const specificCity = cities.find((city) => city.id.toString() === cityId)

      if (
        specificCity &&
        !first20Cities.find((city) => city.id === specificCity.id)
      ) {
        // Add the specific city to the result if it's not already included
        cities = [...first20Cities, specificCity]
      } else {
        cities = first20Cities
      }
    }

    const response = NextResponse.json(cities)

    // Add caching headers for better performance
    response.headers.set('Cache-Control', 'public, max-age=300') // Cache for 5 minutes
    response.headers.set('X-Total-Count', cities.length.toString())

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
