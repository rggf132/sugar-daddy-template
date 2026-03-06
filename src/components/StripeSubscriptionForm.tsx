'use client'

import React, { useState } from 'react'
import { PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js'
import {
  Box,
  Button,
  Typography,
  Card,
  CardContent,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { CalendarToday, CreditCard } from '@mui/icons-material'
import { domainConfig } from 'src/domain.config'

interface StripeSubscriptionFormProps {
  monthlyPrice: number
  trialDays: number
  onSuccess?: (subscription: any) => void
  onError?: (error: string) => void
}

export const StripeSubscriptionForm: React.FC<StripeSubscriptionFormProps> = ({
  monthlyPrice,
  trialDays,
  onSuccess,
  onError,
}) => {
  const stripe = useStripe()
  const elements = useElements()
  const theme = useTheme()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault()

    if (!stripe || !elements) {
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      // Submit the form to validate payment method
      const { error: submitError } = await elements.submit()

      if (submitError) {
        setError(submitError.message || 'Form validation failed')
        onError?.(submitError.message || 'Form validation failed')
        return
      }

      // For trial subscriptions, we use setup intent to collect payment method
      const { error: setupError, setupIntent } = await stripe.confirmSetup({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/stripe/subscription-success`,
        },
        redirect: 'if_required',
      })

      if (setupError) {
        console.error('Setup confirmation error:', setupError)
        setError(setupError.message || 'An unexpected error occurred.')
        onError?.(setupError.message || 'An unexpected error occurred.')
      } else {
        console.log('Setup intent confirmed successfully:', setupIntent)
        setSuccess(true)
        onSuccess?.({ setupIntent })
      }
    } catch (err) {
      console.error('Subscription error:', err)
      const errorMessage =
        err instanceof Error ? err.message : 'Subscription failed'
      setError(errorMessage)
      onError?.(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  if (success) {
    return (
      <Card
        sx={{
          maxWidth: 400,
          mx: 'auto',
          borderRadius: 3,
          boxShadow:
            theme.palette.mode === 'light'
              ? '0 4px 20px rgba(0, 0, 0, 0.08)'
              : '0 4px 20px rgba(0, 0, 0, 0.3)',
        }}
      >
        <CardContent sx={{ p: 4, textAlign: 'center' }}>
          <Typography
            variant='h5'
            sx={{
              fontWeight: 600,
              mb: 2,
              color: 'success.main',
            }}
          >
            Subscription Created! 🎉
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: 'text.secondary',
              mb: 3,
            }}
          >
            Your {trialDays}-day trial has started! You'll be charged $
            {monthlyPrice.toFixed(2)}/month after the trial ends.
          </Typography>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card
      sx={{
        maxWidth: 450,
        mx: 'auto',
        borderRadius: 3,
        boxShadow:
          theme.palette.mode === 'light'
            ? '0 4px 20px rgba(0, 0, 0, 0.08)'
            : '0 4px 20px rgba(0, 0, 0, 0.3)',
      }}
    >
      <CardContent sx={{ p: 4 }}>
        {/* Subscription Header */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Typography
            variant='h5'
            sx={{
              fontWeight: 600,
              mb: 1,
              color: 'text.primary',
            }}
          >
            Premium Subscription
          </Typography>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 700,
              color: 'primary.main',
              mb: 1,
            }}
          >
            ${monthlyPrice.toFixed(2)}
            <Typography
              component='span'
              variant='body1'
              sx={{ color: 'text.secondary', fontWeight: 400 }}
            >
              /month
            </Typography>
          </Typography>
        </Box>

        {/* Trial Info */}
        <Box
          sx={{
            p: 2,
            borderRadius: 2,
            background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
            color: 'white',
            textAlign: 'center',
            mb: 3,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 1,
              mb: 1,
            }}
          >
            <CalendarToday sx={{ fontSize: 18 }} />
            <Typography variant='subtitle1' sx={{ fontWeight: 600 }}>
              {trialDays}-Day Free Trial
            </Typography>
          </Box>
          <Typography variant='body2' sx={{ opacity: 0.9 }}>
            Start your trial today - no charge until{' '}
            {new Date(
              Date.now() + trialDays * 24 * 60 * 60 * 1000,
            ).toLocaleDateString()}
          </Typography>
        </Box>

        {/* Features */}
        <Box sx={{ mb: 3 }}>
          <Typography
            variant='subtitle2'
            sx={{ mb: 2, color: 'text.primary', fontWeight: 600 }}
          >
            What's included:
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
            {domainConfig.payments.subscriptionFeatures.map((feature, index) => (
              <Box
                key={index}
                sx={{ display: 'flex', alignItems: 'center', gap: 1 }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    bgcolor: 'success.main',
                  }}
                />
                <Typography variant='body2' sx={{ color: 'text.secondary' }}>
                  {feature}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Divider sx={{ my: 3 }} />

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <CreditCard sx={{ fontSize: 18, color: 'text.secondary' }} />
              <Typography variant='subtitle2' sx={{ color: 'text.primary' }}>
                Payment Method
              </Typography>
            </Box>
            <PaymentElement
              options={{
                layout: 'tabs',
                wallets: {
                  applePay: 'auto',
                  googlePay: 'auto',
                },
                business: {
                  name: domainConfig.payments.businessName,
                },
                fields: {
                  billingDetails: {
                    name: 'auto',
                    email: 'auto',
                    phone: 'auto',
                    address: 'auto',
                  },
                },
                terms: {
                  card: 'auto',
                },
              }}
            />
          </Box>

          {error && (
            <Alert severity='error' sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}

          <Button
            type='submit'
            variant='contained'
            fullWidth
            disabled={!stripe || isLoading}
            sx={{
              py: 1.5,
              background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
              '&:hover': {
                background: 'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)',
              },
              '&:disabled': {
                background: 'rgba(0, 0, 0, 0.12)',
              },
            }}
          >
            {isLoading ? (
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <CircularProgress size={20} color='inherit' />
                Processing...
              </Box>
            ) : (
              `Start ${trialDays}-Day Free Trial`
            )}
          </Button>

          <Typography
            variant='caption'
            sx={{
              display: 'block',
              textAlign: 'center',
              mt: 2,
              color: 'text.secondary',
            }}
          >
            You'll be charged ${monthlyPrice.toFixed(2)}/month after your trial
            ends. Cancel anytime.
          </Typography>
        </form>
      </CardContent>
    </Card>
  )
}
