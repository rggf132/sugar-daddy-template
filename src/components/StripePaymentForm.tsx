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
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import { domainConfig } from 'src/domain.config'

interface StripePaymentFormProps {
  amount: number
  onSuccess?: (paymentIntent: any) => void
  onError?: (error: string) => void
}

export const StripePaymentForm: React.FC<StripePaymentFormProps> = ({
  amount,
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
      const { error } = await stripe.confirmPayment({
        elements,
        confirmParams: {
          return_url: `${window.location.origin}/stripe/success`,
        },
        redirect: 'if_required',
      })

      if (error) {
        setError(error.message || 'An unexpected error occurred.')
        onError?.(error.message || 'An unexpected error occurred.')
      } else {
        setSuccess(true)
        onSuccess?.(null)
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Payment failed'
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
            Payment Successful! 🎉
          </Typography>
          <Typography
            variant='body1'
            sx={{
              color: 'text.secondary',
              mb: 3,
            }}
          >
            Your payment of ${amount.toFixed(2)} has been processed
            successfully.
          </Typography>
        </CardContent>
      </Card>
    )
  }

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
      <CardContent sx={{ p: 4 }}>
        <Typography
          variant='h5'
          sx={{
            fontWeight: 600,
            mb: 1,
            color: 'text.primary',
            textAlign: 'center',
          }}
        >
          Complete Payment
        </Typography>
        <Typography
          variant='body2'
          sx={{
            color: 'text.secondary',
            textAlign: 'center',
            mb: 3,
          }}
        >
          Amount: ${amount.toFixed(2)}
        </Typography>

        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
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
              `Pay $${amount.toFixed(2)}`
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
