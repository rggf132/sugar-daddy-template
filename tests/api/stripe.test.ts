import { describe, it, expect } from 'vitest'
import { stripe } from 'lib/stripe'

describe('Stripe API - Integration', () => {
  it('should create a payment intent', async () => {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: 1000,
      currency: 'usd',
      description: 'Vitest test payment',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'always',
      },
      metadata: {
        integration_check: 'accept_a_payment',
      },
    })

    expect(paymentIntent).toBeDefined()
    expect(paymentIntent.id).toBeTruthy()
    expect(paymentIntent.client_secret).toBeTruthy()
    expect(paymentIntent.amount).toBe(1000)
    expect(paymentIntent.currency).toBe('usd')
    expect(paymentIntent.status).toBe('requires_payment_method')

    await stripe.paymentIntents.cancel(paymentIntent.id)
  })

  it('should create a customer and setup intent for subscription', async () => {
    const customer = await stripe.customers.create({
      email: 'vitest@test.com',
      name: 'Vitest Test User',
      metadata: { source: 'vitest_test' },
    })

    expect(customer.id).toBeTruthy()
    expect(customer.email).toBe('vitest@test.com')

    const setupIntent = await stripe.setupIntents.create({
      customer: customer.id,
      usage: 'off_session',
      automatic_payment_methods: {
        enabled: true,
        allow_redirects: 'always',
      },
      metadata: {
        customer_email: customer.email || '',
        trial_days: '90',
        subscription_type: 'trial',
      },
    })

    expect(setupIntent.id).toBeTruthy()
    expect(setupIntent.client_secret).toBeTruthy()
    expect(setupIntent.customer).toBe(customer.id)

    await stripe.customers.del(customer.id)
  })
})
