import { z } from 'zod'

export const createEventSchema = z.object({
  title: z.string().min(1).max(191),
  description: z.string().max(191).optional(),
  categoryId: z.union([z.number(), z.bigint(), z.string()]),
  subCategoryIds: z.array(z.union([z.number(), z.bigint(), z.string()])),
  countryId: z.union([z.number(), z.bigint(), z.string()]).optional(),
  cityId: z.union([z.number(), z.bigint(), z.string()]).optional(),
  entryTypeId: z.string().min(1),
  creatorId: z.string().min(1),
  start: z.string().min(1),
  end: z.string().min(1),
  file_key: z.string().optional(),
  type: z.string().optional(),
})

export const updateEventSchema = createEventSchema
