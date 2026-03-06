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
  Chip,
} from '@mui/material'
import { CheckCircle, CalendarToday } from '@mui/icons-material'
import { useSearchParams, useRouter } from 'next/navigation'

const StripeSubscriptionSuccessPage: React.FC = () => {
  const theme = useTheme()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [subscriptionId, setSubscriptionId] = useState<string | null>(null)

  useEffect(() => {
    const subId = searchParams.get('subscription_id')
    if (subId) {
      setSubscriptionId(subId)
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
            Welcome to Premium!
          </Typography>

          <Typography
            variant='body1'
            sx={{
              color: 'text.secondary',
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            Your subscription has been created successfully. Enjoy your 90-day
            free trial!
          </Typography>

          {/* Trial Info */}
          <Box
            sx={{
              p: 3,
              borderRadius: 2,
              background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
              color: 'white',
              mb: 4,
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
              <CalendarToday sx={{ fontSize: 20 }} />
              <Typography variant='h6' sx={{ fontWeight: 600 }}>
                90-Day Free Trial Active
              </Typography>
            </Box>
            <Typography variant='body2' sx={{ opacity: 0.9 }}>
              Your trial ends on{' '}
              {new Date(
                Date.now() + 90 * 24 * 60 * 60 * 1000,
              ).toLocaleDateString()}
            </Typography>
          </Box>

          {/* Features */}
          <Box sx={{ mb: 4 }}>
            <Typography
              variant='h6'
              sx={{
                fontWeight: 600,
                mb: 2,
                color: 'text.primary',
              }}
            >
              Premium Features Unlocked:
            </Typography>
            <Box
              sx={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 1,
                justifyContent: 'center',
              }}
            >
              {[
                'Unlimited Events',
                'Advanced Analytics',
                'Priority Support',
                'Custom Branding',
                'API Access',
              ].map((feature, index) => (
                <Chip
                  key={index}
                  label={feature}
                  sx={{
                    background:
                      'linear-gradient(135deg, #6366F1 0%, #EC4899 100%)',
                    color: 'white',
                    fontWeight: 500,
                  }}
                />
              ))}
            </Box>
          </Box>

          {subscriptionId && (
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
                Subscription ID:
              </Typography>
              <Typography
                variant='body2'
                sx={{
                  fontFamily: 'monospace',
                  color: 'text.primary',
                  wordBreak: 'break-all',
                }}
              >
                {subscriptionId}
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
              Test More Payments
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

export default StripeSubscriptionSuccessPage
