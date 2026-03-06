import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'
import { requireAuth, handleApiError } from 'lib/api-utils'
import { createSubscriptionSchema } from 'lib/validations'
import { stripe } from 'lib/stripe'

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const body = await request.json()
    const { priceId, customerId, trialDays, customerEmail, customerName } =
      createSubscriptionSchema.parse(body)

    let customer: Stripe.Customer

    if (customerId) {
      customer = (await stripe.customers.retrieve(
        customerId,
      )) as Stripe.Customer
    } else {
      customer = await stripe.customers.create({
        email: customerEmail,
        name: customerName,
        metadata: {
          source: 'events_hub_app',
        },
      })
    }

    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      usage: 'off_session',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'always',
      },
      metadata: {
        customer_email: customer.email || '',
        trial_days: trialDays.toString(),
        price_id: priceId || '',
        subscription_type: 'trial',
      },
    })

    return NextResponse.json({
      customerId: customer.id,
      clientSecret: setupIntent.client_secret,
      setupIntentId: setupIntent.id,
      trialDays,
      monthlyPrice: priceId,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
