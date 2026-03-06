import { auth } from './auth'
import { db } from 'db'
import { eq, SQL } from 'drizzle-orm'
import { MySqlTable } from 'drizzle-orm/mysql-core'

export async function getAuthSession() {
  return await auth()
}

export async function requireAuth() {
  const session = await auth()
  if (!session?.user?.id) {
    throw new AuthError('Unauthorized')
  }
  return session
}

export async function requireResourceOwnership(
  table: MySqlTable & Record<string, any>,
  resourceId: number,
  userId: string,
  isAdmin = false,
  ownerColumn = 'creator_id',
) {
  const idCol = (table as any).id
  const ownerCol = (table as any)[ownerColumn]

  if (!idCol || !ownerCol) {
    throw new Error(
      `Table must have 'id' and '${ownerColumn}' columns for ownership check`,
    )
  }

  const [existing] = await db
    .select({ owner: ownerCol })
    .from(table)
    .where(eq(idCol, resourceId) as SQL)
    .limit(1)

  if (!existing) {
    throw new NotFoundError('Resource not found')
  }

  if (!isAdmin && existing.owner !== userId) {
    throw new ForbiddenError(
      'You do not have permission to modify this resource',
    )
  }

  return existing
}

export class AuthError extends Error {
  constructor(message = 'Unauthorized') {
    super(message)
    this.name = 'AuthError'
  }
}

export class ForbiddenError extends Error {
  constructor(message = 'Forbidden') {
    super(message)
    this.name = 'ForbiddenError'
  }
}

export class NotFoundError extends Error {
  constructor(message = 'Not found') {
    super(message)
    this.name = 'NotFoundError'
  }
}

export function handleApiError(error: unknown) {
  console.error('[API Error]', error)

  if (error instanceof AuthError) {
    return Response.json({ message: error.message }, { status: 401 })
  }
  if (error instanceof ForbiddenError) {
    return Response.json({ message: error.message }, { status: 403 })
  }
  if (error instanceof NotFoundError) {
    return Response.json({ message: error.message }, { status: 404 })
  }

  return Response.json({ message: 'Internal Server Error' }, { status: 500 })
}
