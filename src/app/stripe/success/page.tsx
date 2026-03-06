'use client'

import React, { useEffect, useState } from 'react'
import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  useTheme,
} from '@mui/material'
import { CheckCircle } from '@mui/icons-material'
import { useSearchParams, useRouter } from 'next/navigation'

const StripeSuccessPage: React.FC = () => {
  const theme = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [paymentIntent, setPaymentIntent] = useState<string | null>(null)

  useEffect(() => {
    const paymentIntentId = searchParams.get('payment_intent')
    if (paymentIntentId) {
      setPaymentIntent(paymentIntentId)
    }
  }, [searchParams])

  return (
    <Container maxWidth='sm' sx={{ py: 8 }}>
      <Card
        sx={{
          borderRadius: 3,
          boxShadow:
            theme.palette.mode === 'light'
              ? '0 4px 20px rgba(0, 0, 0, 0.08)'
              : '0 4px 20px rgba(0, 0, 0, 0.3)',
          textAlign: 'center',
        }}
      >
        <CardContent sx={{ p: 6 }}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <CheckCircle
              sx={{
                fontSize: 80,
                color: 'success.main',
              }}
            />
          </Box>

          <Typography
            variant='h3'
            sx={{
              fontWeight: 700,
              mb: 2,
              color: 'text.primary',
            }}
          >
            Payment Successful!
          </Typography>

          <Typography
            variant='body1'
            sx={{
              color: 'text.secondary',
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Your payment has been processed successfully. Thank you for your
            purchase!
          </Typography>

          {paymentIntent && (
            <Box
              sx={{
                p: 2,
                bgcolor: theme.palette.mode === 'light' ? '#f8fafc' : '#1e293b',
                borderRadius: 2,
                mb: 4,
              }}
            >
              <Typography
                variant='caption'
                sx={{
                  color: 'text.secondary',
                  display: 'block',
                  mb: 1,
                }}
              >
                Payment Intent ID:
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  fontFamily: 'monospace',
                  color: 'text.primary',
                  wordBreak: 'break-all',
                }}
              >
                {paymentIntent}
              </Typography>
            </Box>
          )}

          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant='contained'
              onClick={() => router.push('/stripe')}
              sx={{
                background: 'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                '&:hover': {
                  background:
                    'linear-gradient(135deg, #4F46E5 0%, #DB2777 100%)',
                },
              }}
            >
              Test Another Payment
            </Button>
            <Button variant='outlined' onClick={() => router.push('/')}>
              Back to Home
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Container>
  )
}

export default StripeSuccessPage
