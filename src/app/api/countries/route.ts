import { NextResponse } from 'next/server'
import { db } from '../../../../db'
import { country } from '../../../../db/schema'
import { like, asc } from 'drizzle-orm'
import 'lib/bigint-polyfill'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const searchTerm = searchParams.get('search')
  const limit = Math.min(Number(searchParams.get('limit')) || 50, 100) // Max 100 results

  try {
    let countries

    if (searchTerm) {
      // Search countries with limit and ordering
      countries = await db
        .select()
        .from(country)
        .where(like(country.name, `%${searchTerm}%`))
        .orderBy(asc(country.name))
        .limit(limit)
    } else {
      // Return first 50 countries (alphabetically)
      countries = await db
        .select()
        .from(country)
        .orderBy(asc(country.name))
        .limit(limit)
    }

    const response = NextResponse.json(countries)

    // Add caching headers for better performance
    response.headers.set('Cache-Control', 'public, max-age=300') // Cache for 5 minutes
    response.headers.set('X-Total-Count', countries.length.toString())

    return response
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 },
    )
  }
}
