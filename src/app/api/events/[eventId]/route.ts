import { db } from 'db'
import { NextRequest } from 'next/server'
import {
  event,
  user,
  country,
  city,
  category,
  subCategory,
  eventToSubCategory,
} from 'db/schema'
import { SQL, eq, sql } from 'drizzle-orm'
import { MySqlQueryResult } from 'drizzle-orm/mysql2'
import {
  requireAuth,
  requireResourceOwnership,
  handleApiError,
} from 'lib/api-utils'
import { updateEventSchema } from 'src/modules/events/validations'
import { getSignedGetUrl, deleteS3Object } from 'lib/s3'
import { entryTypes } from 'src/core/constants'
import 'lib/bigint-polyfill'

type RouteContext = { params: { eventId: string } }

export const GET = async (_: NextRequest, { params }: RouteContext) => {
  const eventId = params.eventId

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
  group_concat(${subCategory.id}) as sub_category_ids,
  group_concat(${subCategory.type}) as sub_category_types from ${event}
  join ${user} on ${event.creator_id} = ${user.id} 
  left join ${country} on ${event.country_id} = ${country.id} 
  left join ${city} on ${event.city_id} = ${city.id} 
  join ${category} on ${event.category_id} = ${category.id} 
  left join ${eventToSubCategory} on ${event.id} = ${eventToSubCategory.event_id} 
  left join ${subCategory} on ${eventToSubCategory.sub_category_id} = ${subCategory.id}`)

  sqlChunks.push(sql` where ${event.id} = ${eventId}`)

  sqlChunks.push(sql` group by ${event.id}`)

  const finalSql: SQL = sql.join(sqlChunks)

  try {
    const [events] = (await db.execute<[]>(
      finalSql,
    )) as unknown as MySqlQueryResult<[]>

    if (events.length === 0) {
      return Response.json({ message: 'Event not found' }, { status: 404 })
    }

    const eventData: Record<string, unknown> = events[0] as unknown as Record<
      string,
      unknown
    >

    if (eventData.file_key) {
      eventData.imageUrl = await getSignedGetUrl(eventData.file_key as string)
    }

    return Response.json(eventData, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

export const DELETE = async (_: NextRequest, { params }: RouteContext) => {
  try {
    const session = await requireAuth()
    const eventId = Number(params.eventId)

    await requireResourceOwnership(
      event,
      eventId,
      session.user!.id!,
      session.user!.isAdmin,
    )

    const [eventRow] = await db
      .select({ file_key: event.file_key })
      .from(event)
      .where(eq(event.id, eventId))
      .limit(1)

    const deletedEvent = await db.delete(event).where(eq(event.id, eventId))

    if (eventRow?.file_key) {
      await deleteS3Object(eventRow.file_key).catch((err: unknown) =>
        console.error('[S3 Cleanup] Failed to delete object:', err),
      )
    }

    return Response.json(deletedEvent, { status: 200 })
  } catch (error) {
    return handleApiError(error)
  }
}

export const PUT = async (request: NextRequest, { params }: RouteContext) => {
  try {
    const session = await requireAuth()
    const eventId = Number(params.eventId)

    await requireResourceOwnership(
      event,
      eventId,
      session.user!.id!,
      session.user!.isAdmin,
    )

    const body = await request.json()
    const validated = updateEventSchema.parse(body)

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
      await tx
        .update(event)
        .set({
          title: validated.title,
          description: validated.description,
          creator_id: session.user!.id!,
          category_id: BigInt(validated.categoryId),
          country_id: validated.countryId ? BigInt(validated.countryId) : null,
          city_id: validated.cityId ? BigInt(validated.cityId) : null,
          entry_type: entryTypeName,
          file_key: validated.file_key,
          file_type: validated.type,
          start: startDateTime,
          end: endDateTime,
        })
        .where(eq(event.id, eventId))

      await tx
        .delete(eventToSubCategory)
        .where(eq(eventToSubCategory.event_id, BigInt(eventId)))

      await Promise.all(
        validated.subCategoryIds.map((subCategoryId) =>
          tx.insert(eventToSubCategory).values({
            event_id: BigInt(eventId),
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
