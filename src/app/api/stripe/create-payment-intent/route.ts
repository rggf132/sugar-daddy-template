import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, handleApiError } from 'lib/api-utils'
import { createPaymentIntentSchema } from 'lib/validations'
import { stripe } from 'lib/stripe'

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const body = await request.json()
    const { amount, currency, description } =
      createPaymentIntentSchema.parse(body)

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount * 100),
      currency,
      description: description || 'Test payment',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'always',
      },
      metadata: {
        integration_check: 'accept_a_payment',
      },
    })

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      paymentIntentId: paymentIntent.id,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
