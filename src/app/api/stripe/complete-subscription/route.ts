import { NextRequest, NextResponse } from 'next/server'
import { requireAuth, handleApiError } from 'lib/api-utils'
import { completeSubscriptionSchema } from 'lib/validations'
import { stripe } from 'lib/stripe'

export async function POST(request: NextRequest) {
  try {
    await requireAuth()
    const body = await request.json()
    const { setupIntentId, customerId, priceId, trialDays } =
      completeSubscriptionSchema.parse(body)

    const setupIntent = await stripe.setupIntents.retrieve(setupIntentId)

    if (setupIntent.status !== 'succeeded') {
      return NextResponse.json(
        { error: 'Setup intent not completed' },
        { status: 400 },
      )
    }

    const subscription = await stripe.subscriptions.create({
      customer: customerId,
      items: [
        {
          price: priceId,
        },
      ],
      default_payment_method: setupIntent.payment_method as string,
      trial_period_days: trialDays,
      metadata: {
        trial_days: trialDays.toString(),
        source: 'events_hub_subscription',
        setup_intent_id: setupIntentId,
      },
    })

    return NextResponse.json({
      subscriptionId: subscription.id,
      customerId: customerId,
      trialEnd: subscription.trial_end,
      status: subscription.status,
    })
  } catch (error) {
    return handleApiError(error)
  }
}
