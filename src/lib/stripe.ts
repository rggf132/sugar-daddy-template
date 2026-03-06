import { loadStripe } from '@stripe/stripe-js'

// Initialize Stripe.js with your publishable key
export const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
)

// Stripe configuration
export const stripeConfig = {
  appearance: {
    theme: 'stripe' as const,
    variables: {
      colorPrimary: '#6366F1',
      colorBackground: '#ffffff',
      colorText: '#1E293B',
      colorDanger: '#EF4444',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  },
  clientSecret: '',
}

// Dark theme configuration
export const stripeConfigDark = {
  appearance: {
    theme: 'night' as const,
    variables: {
      colorPrimary: '#818CF8',
      colorBackground: '#1E293B',
      colorText: '#F1F5F9',
      colorDanger: '#F87171',
      fontFamily: 'Inter, system-ui, sans-serif',
      spacingUnit: '4px',
      borderRadius: '8px',
    },
  },
  clientSecret: '',
}

// Payment method configuration
export const paymentMethodOptions = {
  layout: 'tabs' as const,
  wallets: {
    applePay: 'auto' as const,
    googlePay: 'auto' as const,
  },
  business: {
    name: 'Events Hub',
  },
  fields: {
    billingDetails: 'auto' as const,
  },
  terms: {
    card: 'auto' as const,
  },
}

// Enhanced payment methods for subscriptions
export const subscriptionPaymentMethods = {
  layout: 'tabs' as const,
  wallets: {
    applePay: 'auto' as const,
    googlePay: 'auto' as const,
  },
  business: {
    name: 'Events Hub',
  },
  fields: {
    billingDetails: {
      name: 'auto' as const,
      email: 'auto' as const,
      phone: 'auto' as const,
      address: 'auto' as const,
    },
  },
  terms: {
    card: 'auto' as const,
  },
}
