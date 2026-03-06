import { country, city } from 'db/schema'
import { InferSelectModel } from 'drizzle-orm'

export type Country = InferSelectModel<typeof country>
export type City = InferSelectModel<typeof city>
