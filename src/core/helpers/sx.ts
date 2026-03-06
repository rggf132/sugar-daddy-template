import { CSSObject, SxProps, Theme } from '@mui/system'
import styleFunctionSx from '@mui/system/styleFunctionSx'

export const sx =
  (styles: SxProps<Theme>) =>
  ({ theme }: { theme: Theme }) => {
    return styleFunctionSx({ sx: styles, theme }) as CSSObject
  }
