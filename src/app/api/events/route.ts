import { db } from 'db'
import {
  event,
  user,
  country,
  city,
  category,
  subCategory,
  eventToSubCategory,
} from 'db/schema'
import { SQL, sql, inArray } from 'drizzle-orm'
import { NextRequest } from 'next/server'
import { entryTypes } from 'src/core/constants'
import { MySqlQueryResult } from 'drizzle-orm/mysql2'
import { requireAuth, handleApiError } from 'lib/api-utils'
import { createEventSchema } from 'src/modules/events/validations'
import { getSignedGetUrl } from 'lib/s3'
import 'lib/bigint-polyfill'

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams

  const term = searchParams.get('term') || undefined
  const categoryId = Number(searchParams.get('categoryId')) || undefined
  const subCategoryIds = searchParams.get('subCategoryIds') || undefined
  const countryId = searchParams.get('countryId') || undefined
  const cityId = searchParams.get('cityId') || undefined
  const entryTypeId = searchParams.get('entryTypeId') || undefined
  const startTime = searchParams.get('startTime') || undefined
  const endTime = searchParams.get('endTime') || undefined

  const page = Number(searchParams.get('page')) || 1
  const limit = Math.min(Number(searchParams.get('limit')) || 20, 100)
  const offset = (page - 1) * limit

  const sqlChunks: SQL[] = []
  sqlChunks.push(sql`select ${event.id} as id,
  ${event.title} as title,
  ${event.start} as start,
  ${event.end} as end,
  ${event.description} as description,
  ${event.creator_id},
  ${event.entry_type},
  ${event.file_key},
  ${event.file_type},
  ${user.name} as creator_name,
  ${user.email} as creator_email,
  ${user.image} as creator_image,
  ${country.id} as country_id,
  ${country.name} as country_name,
  ${city.id} as city_id,
  ${city.name} as city_name,
  ${category.id} as category_id,
  ${category.type} as category_type,
  group_concat(${subCategory.id} separator ',') as sub_category_ids,
  group_concat(${subCategory.type} separator ',') as sub_category_types from ${event}
  join ${user} on ${event.creator_id} = ${user.id} 
  left join ${country} on ${event.country_id} = ${country.id} 
  left join ${city} on ${event.city_id} = ${city.id} 
  join ${category} on ${event.category_id} = ${category.id} 
  left join ${eventToSubCategory} on ${event.id} = ${eventToSubCategory.event_id} 
  left join ${subCategory} on ${eventToSubCategory.sub_category_id} = ${subCategory.id}`)

  const filters = [
    term,
    categoryId,
    subCategoryIds,
    countryId,
    cityId,
    entryTypeId,
    startTime,
    endTime,
  ]

  const entryType = entryTypes?.[Number(entryTypeId) - 1]?.type

  filters.forEach((filter) => {
    if (filter && sqlChunks.length === 1) sqlChunks.push(sql` where `)
    else if (filter) sqlChunks.push(sql` and `)

    if (filter === term && term) {
      sqlChunks.push(sql`${event.title} like ${'%' + term + '%'}`)
    } else if (filter === categoryId && categoryId) {
      sqlChunks.push(sql`${event.category_id} = ${categoryId}`)
    } else if (filter === countryId && countryId) {
      sqlChunks.push(sql`${event.country_id} = ${countryId}`)
    } else if (filter === cityId && cityId) {
      sqlChunks.push(sql`${event.city_id} = ${cityId}`)
    } else if (filter === entryTypeId && entryTypeId) {
      sqlChunks.push(sql`${event.entry_type} = ${entryType}`)
    } else if (filter === startTime && startTime) {
      const startDateTime = new Date(startTime)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
      sqlChunks.push(sql`${event.start} >= ${startDateTime}`)
    } else if (filter === endTime && endTime) {
      const endDateTime = new Date(endTime)
        .toISOString()
        .slice(0, 19)
        .replace('T', ' ')
      sqlChunks.push(sql`${event.end} <= ${endDateTime}`)
    } else if (filter === subCategoryIds && subCategoryIds) {
      const subCategoryIdArray = subCategoryIds
        .split(',')
        .map((id) => Number(id.trim()))
      sqlChunks.push(sql`${inArray(subCategory.id, subCategoryIdArray)}`)
    }
  })

  sqlChunks.push(sql` group by ${event.id}`)

  sqlChunks.push(sql` order by ${event.created_at} desc`)

  sqlChunks.push(sql` limit ${limit} offset ${offset}`)

  const finalSql: SQL = sql.join(sqlChunks)

  try {
    const [events] = (await db.execute<[]>(
      finalSql,
    )) as unknown as MySqlQueryResult<[]>

    const eventsWithFiles = events.filter((event: any) => event.file_key)

    if (eventsWithFiles.length > 0) {
      await Promise.all(
        eventsWithFiles.map(async (event: any) => {
          event.imageUrl = await getSignedGetUrl(event.file_key)
        }),
      )
    }

    events.forEach((event: any) => {
      delete event.file_key
      delete event.file_type
    })

    return Response.json(
      {
        events,
        pagination: {
          page,
          limit,
          hasMore: events.length === limit,
        },
      },
      { status: 200 },
    )
  } catch (error) {
    return handleApiError(error)
  }
}

export const POST = async (request: NextRequest) => {
  try {
    const session = await requireAuth()
    const userId = session.user!.id!
    const body = await request.json()
    const validated = createEventSchema.parse(body)

    const startDateTime = new Date(validated.start)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')
    const endDateTime = new Date(validated.end)
      .toISOString()
      .slice(0, 19)
      .replace('T', ' ')

    const entryTypeName = entryTypes.find(
      (et) => et.id === validated.entryTypeId,
    )?.type as 'Free' | 'Paid' | undefined

    await db.transaction(async (tx) => {
      const createdEvent = await tx.insert(event).values({
        title: validated.title,
        description: validated.description,
        creator_id: userId,
        category_id: BigInt(validated.categoryId),
        country_id: validated.countryId ? BigInt(validated.countryId) : null,
        city_id: validated.cityId ? BigInt(validated.cityId) : null,
        entry_type: entryTypeName,
        start: startDateTime,
        end: endDateTime,
        ...(validated.file_key
          ? { file_key: validated.file_key, file_type: validated.type }
          : {}),
      })

      await Promise.all(
        validated.subCategoryIds.map((subCategoryId) =>
          tx.insert(eventToSubCategory).values({
            event_id: BigInt(createdEvent[0].insertId),
            sub_category_id: BigInt(subCategoryId),
          }),
        ),
      )
    })

    return Response.json({}, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}
