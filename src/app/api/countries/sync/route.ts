import { NextResponse } from 'next/server'
import { db } from '../../../../../db'
import { country, city } from '../../../../../db/schema'
import { requireAuth } from 'lib/api-utils'

// Fetch all countries with positions (lat/lng)
async function fetchCountries(logs: string[]) {
  logs.push('Fetching countries...')
  const res = await fetch(
    'https://countriesnow.space/api/v0.1/countries/positions',
  )
  const json = await res.json()
  logs.push(`Fetched ${json.data.length} countries.`)
  if (json.data.length > 0) {
    logs.push(`First country object: ${JSON.stringify(json.data[0])}`)
  }
  return json.data // [{ country, iso2, iso3, lat, long, ... }, ...]
}

// Fetch cities for a given country name
async function fetchCities(countryName: string, logs: string[]) {
  logs.push(`Fetching cities for ${countryName}...`)
  const res = await fetch(
    'https://countriesnow.space/api/v0.1/countries/cities',
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ country: countryName }),
    },
  )
  const contentType = res.headers.get('content-type')
  if (!contentType || !contentType.includes('application/json')) {
    logs.push(`Failed to fetch cities for ${countryName}: Response not JSON.`)
    return []
  }
  const json = await res.json()
  logs.push(
    `Fetched ${Array.isArray(json.data) ? json.data.length : 0} cities for ${countryName}.`,
  )
  return json.data // ["City1", "City2", ...]
}

export async function POST() {
  const logs: string[] = []
  try {
    await requireAuth()
    logs.push('Starting country/city sync...')
    // 1. Fetch countries
    const countries = await fetchCountries(logs)

    // 2. Clear existing data
    logs.push('Deleting all cities...')
    await db.delete(city)
    logs.push('Deleting all countries...')
    await db.delete(country)

    // 3. Insert countries
    const invalidCountries = countries.filter((c: any) => !c.name)
    if (invalidCountries.length > 0) {
      logs.push(
        `Skipped ${invalidCountries.length} countries with missing name.`,
      )
    }
    const countryRows = countries
      .filter((c: any) => !!c.name)
      .map((c: any) => ({
        name: c.name,
        iso2: c.iso2,
        iso3: c.iso3,
        lat: c.lat,
        lng: c.long,
      }))
    logs.push(`Inserting ${countryRows.length} countries...`)
    await db.insert(country).values(countryRows)

    // 4. Query inserted countries for IDs
    const dbCountries = await db.select().from(country)
    logs.push(`Inserted and loaded ${dbCountries.length} countries from DB.`)

    // 5. Insert cities for each country
    let totalCities = 0
    for (const c of dbCountries) {
      const cities = await fetchCities(c.name, logs)
      if (Array.isArray(cities)) {
        const cityRows = cities.map((cityName: string) => ({
          name: cityName,
          country_id: BigInt(c.id),
        }))
        if (cityRows.length > 0) {
          logs.push(`Inserting ${cityRows.length} cities for ${c.name}...`)
          await db.insert(city).values(cityRows)
          totalCities += cityRows.length
        }
      }
    }

    logs.push('Country/city sync complete.')
    return NextResponse.json({
      message: 'Country/city sync complete.',
      countries: dbCountries.length,
      cities: totalCities,
      logs,
    })
  } catch (error) {
    logs.push(
      `Error: ${error instanceof Error ? error.message : String(error)}`,
    )
    console.error('[Countries Sync Error]', error)
    return NextResponse.json(
      {
        message: 'Sync failed.',
        logs,
      },
      { status: 500 },
    )
  }
}
