import { Box, BoxProps } from '@mui/system'
import * as React from 'react'

const Flex = React.forwardRef<HTMLDivElement, BoxProps>(
  ({ children, ...props }: BoxProps, ref) => {
    return (
      <Box ref={ref} display='flex' {...props}>
        {children}
      </Box>
    )
  },
)

export { Flex }
