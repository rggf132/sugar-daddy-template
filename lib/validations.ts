import { z } from 'zod'

const ALLOWED_IMAGE_TYPES = [
  'image/png',
  'image/jpeg',
  'image/jpg',
  'image/webp',
] as const

export const uploadMediaSchema = z.object({
  file_key: z.string().min(1).max(500),
  type: z.enum(ALLOWED_IMAGE_TYPES),
})

export const deleteMediaSchema = z.object({
  file_key: z.string().min(1),
})

export const createPaymentIntentSchema = z.object({
  amount: z.number().positive(),
  currency: z.string().default('usd'),
  description: z.string().optional(),
})

export const createSubscriptionSchema = z.object({
  priceId: z.string().optional(),
  customerId: z.string().optional(),
  trialDays: z.number().default(90),
  customerEmail: z.string().email().optional(),
  customerName: z.string().optional(),
})

export const completeSubscriptionSchema = z.object({
  setupIntentId: z.string().min(1),
  customerId: z.string().min(1),
  priceId: z.string().min(1),
  trialDays: z.number().default(90),
})
