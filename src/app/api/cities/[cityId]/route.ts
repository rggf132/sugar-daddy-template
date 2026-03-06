import { NextResponse } from 'next/server'
import { db } from '../../../../../db'
import { city, country } from '../../../../../db/schema'
import { eq } from 'drizzle-orm'
import 'lib/bigint-polyfill'

export async function GET(
  req: Request,
  { params }: { params: { cityId: string } },
) {
  const cityId = params.cityId

  try {
    // Find the city by ID and include country information
    const found = await db
      .select({
        id: city.id,
        name: city.name,
        country_id: city.country_id,
        lat: city.lat,
        lng: city.lng,
        created_at: city.created_at,
        modified_at: city.modified_at,
        country_name: country.name,
      })
      .from(city)
      .leftJoin(country, eq(city.country_id, country.id))
      .where(eq(city.id, Number(cityId)))
      .limit(1)

    if (!found.length) {
      return NextResponse.json({ error: 'City not found' }, { status: 404 })
    }

    const response = NextResponse.json(found[0])

    // Add caching headers for better performance
    response.headers.set('Cache-Control', 'public, max-age=300') // Cache for 5 minutes

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
