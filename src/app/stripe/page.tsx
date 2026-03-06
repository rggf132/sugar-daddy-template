'use client'

import React, { useState } from 'react'
import { Elements } from '@stripe/react-stripe-js'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  TextField,
  Button,
  Alert,
  Grid,
  Chip,
  useTheme,
  CircularProgress,
} from '@mui/material'
import { stripePromise, stripeConfig, stripeConfigDark } from 'src/lib/stripe'
import { StripePaymentForm } from 'src/components/StripePaymentForm'
import { StripeSubscriptionForm } from 'src/components/StripeSubscriptionForm'
import { APIAxiosInstance } from 'src/core/axios/api-axios-instance'

const StripePage: React.FC = () => {
  const theme = useTheme()
  const [amount, setAmount] = useState(10.0)
  const [clientSecret, setClientSecret] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [paymentType, setPaymentType] = useState<'one-time' | 'subscription'>(
    'one-time',
  )

  // Subscription state
  const [subscriptionClientSecret, setSubscriptionClientSecret] = useState('')
  const [monthlyPrice] = useState(29.99)
  const [trialDays] = useState(90)
  const [isCreatingSubscription, setIsCreatingSubscription] = useState(false)

  const createPaymentIntent = async () => {
    setIsLoading(true)
    setError(null)

    try {
      const { data } = await APIAxiosInstance.post(
        '/stripe/create-payment-intent',
        {
          amount,
          currency: 'usd',
          description: `Test payment - $${amount.toFixed(2)}`,
        },
      )

      setClientSecret(data.clientSecret)
    } catch (err) {
      console.log('err', err)
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to create payment'
      setError(errorMessage)
    } finally {
      setIsLoading(false)
    }
  }

  const createSubscription = async () => {
    setIsCreatingSubscription(true)
    setError(null)

    try {
      const { data } = await APIAxiosInstance.post(
        '/stripe/create-subscription',
        {
          priceId: 'price_1S5XIPFfnHtHMWOAIofJkr7T', // You'll need to create this in Stripe
          customerEmail: 'test@example.com',
          customerName: 'Test User',
          trialDays,
        },
      )

      setSubscriptionClientSecret(data.clientSecret)
    } catch (err) {
      console.log('err', err)
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to create subscription'
      setError(errorMessage)
    } finally {
      setIsCreatingSubscription(false)
    }
  }

  const resetPayment = () => {
    setClientSecret('')
    setSubscriptionClientSecret('')
    setError(null)
  }

  const handlePaymentSuccess = (result: any) => {
    console.log('Payment successful!', result)
    if (paymentType === 'subscription') {
      console.log('Subscription created successfully!')
    }
    // You can add additional success handling here
  }

  const handlePaymentError = (error: string) => {
    setError(error)
  }

  // Get appropriate Stripe configuration based on theme
  const stripeOptions = {
    clientSecret:
      paymentType === 'one-time' ? clientSecret : subscriptionClientSecret,
    appearance:
      theme.palette.mode === 'dark'
        ? stripeConfigDark.appearance
        : stripeConfig.appearance,
  }

  return (
    <Container maxWidth='md' sx={{ py: 4 }}>
      <Typography
        variant='h3'
        sx={{
          fontWeight: 700,
          mb: 1,
          textAlign: 'center',
          background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}
      >
        Stripe Payment Test
      </Typography>
      <Typography
        variant='body1'
        sx={{
          textAlign: 'center',
          color: 'text.secondary',
          mb: 4,
        }}
      >
        Test Stripe integration with secure payment processing
      </Typography>

      {/* Payment Type Selector */}
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 4 }}>
        <Box
          sx={{
            display: 'flex',
            bgcolor: theme.palette.mode === 'light' ? '#f8fafc' : '#1e293b',
            borderRadius: 2,
            p: 0.5,
          }}
        >
          <Button
            variant={paymentType === 'one-time' ? 'contained' : 'text'}
            onClick={() => setPaymentType('one-time')}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 1.5,
              background:
                paymentType === 'one-time'
                  ? 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)'
                  : 'transparent',
              color: paymentType === 'one-time' ? 'white' : 'text.primary',
              '&:hover': {
                background:
                  paymentType === 'one-time'
                    ? 'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)'
                    : 'rgba(99, 102, 241, 0.1)',
              },
            }}
          >
            One-time Payment
          </Button>
          <Button
            variant={paymentType === 'subscription' ? 'contained' : 'text'}
            onClick={() => setPaymentType('subscription')}
            sx={{
              px: 3,
              py: 1,
              borderRadius: 1.5,
              background:
                paymentType === 'subscription'
                  ? 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)'
                  : 'transparent',
              color: paymentType === 'subscription' ? 'white' : 'text.primary',
              '&:hover': {
                background:
                  paymentType === 'subscription'
                    ? 'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)'
                    : 'rgba(99, 102, 241, 0.1)',
              },
            }}
          >
            Subscription (90-day trial)
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Payment Setup */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
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
                  mb: 3,
                  color: 'text.primary',
                }}
              >
                {paymentType === 'one-time'
                  ? 'Payment Setup'
                  : 'Subscription Setup'}
              </Typography>

              {paymentType === 'one-time' && (
                <Box sx={{ mb: 3 }}>
                  <TextField
                    label='Amount (USD)'
                    type='number'
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    inputProps={{
                      min: 0.5,
                      step: 0.01,
                    }}
                    fullWidth
                    sx={{ mb: 2 }}
                  />
                </Box>
              )}

              {paymentType === 'subscription' && (
                <Box sx={{ mb: 3 }}>
                  <Typography
                    variant='h4'
                    sx={{
                      fontWeight: 700,
                      color: 'primary.main',
                      textAlign: 'center',
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
                  <Box
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      background:
                        'linear-gradient(135deg, #10B981 0%, #059669 100%)',
                      color: 'white',
                      textAlign: 'center',
                      mb: 2,
                    }}
                  >
                    <Typography
                      variant='subtitle1'
                      sx={{ fontWeight: 600, mb: 0.5 }}
                    >
                      {trialDays}-Day Free Trial
                    </Typography>
                    <Typography variant='body2' sx={{ opacity: 0.9 }}>
                      No charge until{' '}
                      {new Date(
                        Date.now() + trialDays * 24 * 60 * 60 * 1000,
                      ).toLocaleDateString()}
                    </Typography>
                  </Box>
                </Box>
              )}

              <Box sx={{ mb: 3 }}>
                <Typography
                  variant='subtitle2'
                  sx={{ mb: 1, color: 'text.secondary' }}
                >
                  Test Cards:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  <Chip
                    label='4242 4242 4242 4242'
                    size='small'
                    sx={{ fontSize: '0.75rem' }}
                  />
                  <Chip
                    label='Success'
                    size='small'
                    color='success'
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Box>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 1 }}>
                  <Chip
                    label='4000 0000 0000 0002'
                    size='small'
                    sx={{ fontSize: '0.75rem' }}
                  />
                  <Chip
                    label='Declined'
                    size='small'
                    color='error'
                    sx={{ fontSize: '0.75rem' }}
                  />
                </Box>
              </Box>

              {error && (
                <Alert severity='error' sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <Button
                variant='contained'
                fullWidth
                onClick={
                  paymentType === 'one-time'
                    ? createPaymentIntent
                    : createSubscription
                }
                disabled={
                  (paymentType === 'one-time'
                    ? isLoading
                    : isCreatingSubscription) ||
                  (paymentType === 'one-time' && amount < 0.5)
                }
                sx={{
                  py: 1.5,
                  background:
                    'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                  '&:hover': {
                    background:
                      'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)',
                  },
                }}
              >
                {(
                  paymentType === 'one-time'
                    ? isLoading
                    : isCreatingSubscription
                ) ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} color='inherit' />
                    {paymentType === 'one-time'
                      ? 'Creating Payment...'
                      : 'Creating Subscription...'}
                  </Box>
                ) : paymentType === 'one-time' ? (
                  'Create Payment Intent'
                ) : (
                  'Start Free Trial'
                )}
              </Button>

              {(clientSecret || subscriptionClientSecret) && (
                <Button
                  variant='outlined'
                  fullWidth
                  onClick={resetPayment}
                  sx={{ mt: 1 }}
                >
                  Reset Payment
                </Button>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Payment Form */}
        <Grid item xs={12} md={6}>
          {clientSecret || subscriptionClientSecret ? (
            <Elements stripe={stripePromise} options={stripeOptions}>
              {paymentType === 'one-time' ? (
                <StripePaymentForm
                  amount={amount}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              ) : (
                <StripeSubscriptionForm
                  monthlyPrice={monthlyPrice}
                  trialDays={trialDays}
                  onSuccess={handlePaymentSuccess}
                  onError={handlePaymentError}
                />
              )}
            </Elements>
          ) : (
            <Card
              sx={{
                borderRadius: 3,
                boxShadow:
                  theme.palette.mode === 'light'
                    ? '0 4px 20px rgba(0, 0, 0, 0.08)'
                    : '0 4px 20px rgba(0, 0, 0, 0.3)',
                height: 'fit-content',
              }}
            >
              <CardContent sx={{ p: 4, textAlign: 'center' }}>
                <Typography
                  variant='h6'
                  sx={{
                    fontWeight: 600,
                    mb: 2,
                    color: 'text.secondary',
                  }}
                >
                  {paymentType === 'one-time'
                    ? 'Payment Form'
                    : 'Subscription Form'}
                </Typography>
                <Typography
                  variant='body2'
                  sx={{
                    color: 'text.secondary',
                  }}
                >
                  {paymentType === 'one-time'
                    ? 'Set an amount and create a payment intent to see the Stripe payment form here.'
                    : 'Click "Start Free Trial" to see the subscription form with Apple Pay and Google Pay support.'}
                </Typography>
              </CardContent>
            </Card>
          )}
        </Grid>
      </Grid>
    </Container>
  )
}

export default StripePage
