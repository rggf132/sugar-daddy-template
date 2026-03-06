import { CheckCircleOutlined, Close, WarningAmber } from '@mui/icons-material'
import { keyframes, styled } from '@mui/material/styles'
import * as RadixToast from '@radix-ui/react-toast'
import { sx } from 'src/core/helpers/sx'
import { Flex } from '../Flex'
import { Box, CircularProgress, Typography } from '@mui/material'
import { ToastDuration, ToastVariant } from 'src/core/toast'

type ToastComponentProps = {
  variant: ToastVariant
  message: string
  onOpenChange: (open: boolean) => void
  duration?: ToastDuration
}

const slideIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
`

const slideOut = keyframes`
  from {
    opacity: 1;
    transform: translateX(0);
  }
  to {
    opacity: 0;
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
`

const swipeOut = keyframes`
  from {
    transform: translateX(var(--radix-toast-swipe-end-x));
  }
  to {
    transform: translateX(calc(100% + var(--viewport-padding)));
  }
`

export const Toast: React.FC<ToastComponentProps> = ({
  onOpenChange,
  message,
  variant,
  duration: durationProp = 2000,
}) => {
  const contentColorMap = {
    ERROR: 'white',
    SUCCESS: 'white',
    PROGRESS: undefined,
  }
  const contentColor = contentColorMap[variant]

  const oneHour = 3600000
  const duration = durationProp === 'infinite' ? oneHour : durationProp
  return (
    <ToastRoot
      variant={variant}
      duration={duration}
      onOpenChange={onOpenChange}
    >
      <Flex alignItems='center'>
        <Flex mr={1} alignItems='center'>
          {variant === 'ERROR' && <WarningAmber sx={{ color: contentColor }} />}
          {variant === 'SUCCESS' && (
            <CheckCircleOutlined sx={{ color: contentColor }} />
          )}
          {variant === 'PROGRESS' && (
            <CircularProgress sx={{ color: contentColor }} size={20} />
          )}
        </Flex>
        <Typography sx={{ color: contentColor }} color='white'>
          {message}
        </Typography>
        <Box flexGrow={1} />
        <RadixToast.Close asChild>
          <Close sx={{ color: contentColor }} />
        </RadixToast.Close>
      </Flex>
    </ToastRoot>
  )
}

type ToastRootType = {
  variant: 'ERROR' | 'SUCCESS' | 'PROGRESS'
}

const colorMap = {
  ERROR: '#fe4f3b',
  SUCCESS: '#32a976',
  PROGRESS: 'white',
}

const ToastRoot = styled(RadixToast.Root)<ToastRootType>`
  ${({ variant }) => {
    return (
      variant &&
      sx({
        backgroundColor: colorMap?.[variant],
      })
    )
  }}
  border-radius: 6px;
  box-shadow:
    hsl(206 22% 7% / 35%) 0px 10px 38px -10px,
    hsl(206 22% 7% / 20%) 0px 10px 20px -15px;
  padding: 15px;
  opacity: 0.95;

  // Animations below don't work for some reason, but kept here as a reminder
  // See: https://www.radix-ui.com/primitives/docs/components/toast
  &[data-state='open'] {
    animation: ${slideIn} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-state='closed'] {
    animation: ${slideOut} 150ms cubic-bezier(0.16, 1, 0.3, 1);
  }
  &[data-swipe='move'] {
    transform: translateX(var(--radix-toast-swipe-move-x));
  }
  &[data-swipe='cancel'] {
    transform: translateX(0);
    transition: transform 200ms ease-out;
  }
  &[data-swipe='end'] {
    animation: ${swipeOut} 100ms ease-out;
  }
`
