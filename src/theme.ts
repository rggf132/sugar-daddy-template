import { createTheme, alpha, getContrastRatio } from '@mui/material/styles'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  display: 'swap',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
})

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    ochre: true
    violet: true
    gradient: true
  }
}

import '@mui/material/styles/createPalette'
declare module '@mui/material/styles/createPalette' {
  interface PaletteOptions {
    ochre?: PaletteColorOptions
    violet?: PaletteColorOptions
    gradient?: PaletteColorOptions
  }

  interface Palette {
    ochre: PaletteColor
    violet: PaletteColor
    gradient: PaletteColor
  }
}

const violetBase = '#7F00FF'
const violetMain = alpha(violetBase, 0.7)

// Light theme colors
const lightColors = {
  primary: {
    main: '#6366F1', // Modern indigo
    light: '#818CF8',
    dark: '#4F46E5',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#EC4899', // Modern pink
    light: '#F472B6',
    dark: '#DB2777',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#10B981', // Modern emerald
    light: '#34D399',
    dark: '#059669',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#06B6D4', // Modern cyan
    light: '#22D3EE',
    dark: '#0891B2',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#F59E0B', // Modern amber
    light: '#FBBF24',
    dark: '#D97706',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#EF4444', // Modern red
    light: '#F87171',
    dark: '#DC2626',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#F8FAFC', // Modern slate-50
    paper: '#FFFFFF',
  },
  text: {
    primary: '#1E293B', // Modern slate-800
    secondary: '#64748B', // Modern slate-500
  },
}

// Dark theme colors
const darkColors = {
  primary: {
    main: '#818CF8', // Lighter indigo for dark mode
    light: '#A5B4FC',
    dark: '#6366F1',
    contrastText: '#FFFFFF',
  },
  secondary: {
    main: '#F472B6', // Lighter pink for dark mode
    light: '#F9A8D4',
    dark: '#EC4899',
    contrastText: '#FFFFFF',
  },
  success: {
    main: '#34D399', // Lighter emerald for dark mode
    light: '#6EE7B7',
    dark: '#10B981',
    contrastText: '#FFFFFF',
  },
  info: {
    main: '#22D3EE', // Lighter cyan for dark mode
    light: '#67E8F9',
    dark: '#06B6D4',
    contrastText: '#FFFFFF',
  },
  warning: {
    main: '#FBBF24', // Lighter amber for dark mode
    light: '#FCD34D',
    dark: '#F59E0B',
    contrastText: '#FFFFFF',
  },
  error: {
    main: '#F87171', // Lighter red for dark mode
    light: '#FCA5A5',
    dark: '#EF4444',
    contrastText: '#FFFFFF',
  },
  background: {
    default: '#0F172A', // Modern slate-900
    paper: '#1E293B', // Modern slate-800
  },
  text: {
    primary: '#F1F5F9', // Modern slate-100
    secondary: '#94A3B8', // Modern slate-400
  },
}

export const createAppTheme = (mode: 'light' | 'dark') => {
  const colors = mode === 'light' ? lightColors : darkColors

  return createTheme({
    palette: {
      mode,
      ...colors,
      ochre: {
        main: '#E3D026',
        light: '#E9DB5D',
        dark: '#A29415',
        contrastText: '#242105',
      },
      violet: {
        main: violetMain,
        light: alpha(violetBase, 0.5),
        dark: alpha(violetBase, 0.9),
        contrastText:
          getContrastRatio(violetMain, '#fff') > 4.5 ? '#fff' : '#111',
      },
      gradient: {
        main: colors.primary.main,
        light: colors.secondary.main,
        dark: colors.primary.dark,
        contrastText: '#FFFFFF',
      },
    },
    typography: {
      fontFamily: inter.style.fontFamily,
      h1: {
        fontFamily: inter.style.fontFamily,
        fontWeight: 700,
        letterSpacing: '-0.02em',
      },
      h2: {
        fontFamily: inter.style.fontFamily,
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h3: {
        fontFamily: inter.style.fontFamily,
        fontWeight: 600,
        letterSpacing: '-0.01em',
      },
      h4: {
        fontFamily: inter.style.fontFamily,
        fontWeight: 600,
      },
      h5: {
        fontFamily: inter.style.fontFamily,
        fontWeight: 600,
      },
      h6: {
        fontFamily: inter.style.fontFamily,
        fontWeight: 600,
      },
      button: {
        fontFamily: inter.style.fontFamily,
        fontWeight: 600,
        textTransform: 'none',
        letterSpacing: '0.01em',
      },
    },
    shape: {
      borderRadius: 12,
    },
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 16,
            boxShadow:
              mode === 'light'
                ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                : '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)',
            border:
              mode === 'light'
                ? '1px solid rgba(0, 0, 0, 0.05)'
                : '1px solid rgba(255, 255, 255, 0.05)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              boxShadow:
                mode === 'light'
                  ? '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
                  : '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0, 0, 0, 0.3)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            fontWeight: 600,
            textTransform: 'none',
            padding: '8px 16px',
            '&.MuiButton-contained': {
              boxShadow:
                mode === 'light'
                  ? '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
                  : '0 1px 3px 0 rgba(0, 0, 0, 0.3), 0 1px 2px 0 rgba(0, 0, 0, 0.2)',
              '&:hover': {
                boxShadow:
                  mode === 'light'
                    ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                    : '0 4px 6px -1px rgba(0, 0, 0, 0.4), 0 2px 4px -1px rgba(0, 0, 0, 0.3)',
              },
            },
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 500,
          },
        },
      },
      MuiAutocomplete: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px !important',
              backgroundColor:
                mode === 'light'
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(8px)',
              '&:hover': {
                backgroundColor:
                  mode === 'light'
                    ? 'rgba(255, 255, 255, 0.9)'
                    : 'rgba(30, 41, 59, 0.9)',
              },
              '&.Mui-focused': {
                backgroundColor:
                  mode === 'light'
                    ? 'rgba(255, 255, 255, 0.95)'
                    : 'rgba(30, 41, 59, 0.95)',
              },
              '&.Mui-disabled': {
                backgroundColor:
                  mode === 'light'
                    ? 'rgba(0, 0, 0, 0.04)'
                    : 'rgba(255, 255, 255, 0.04)',
              },
            },
            '& .MuiInputLabel-root': {
              color: colors.text.secondary,
              fontWeight: 500,
              fontSize: '0.875rem',
              '&.Mui-disabled': {
                color:
                  mode === 'light'
                    ? 'rgba(0, 0, 0, 0.38)'
                    : 'rgba(255, 255, 255, 0.38)',
              },
            },
            '& .MuiAutocomplete-inputRoot': {
              borderRadius: '20px !important',
            },
            '& .MuiAutocomplete-input': {
              borderRadius: '20px !important',
            },
            '& .MuiAutocomplete-endAdornment': {
              borderRadius: '20px !important',
            },
            '& .MuiAutocomplete-clearIndicator': {
              borderRadius: '20px !important',
            },
            '& .MuiAutocomplete-popupIndicator': {
              borderRadius: '20px !important',
            },
            '& fieldset': {
              borderRadius: '20px !important',
            },
            '& .MuiOutlinedInput-root fieldset': {
              borderRadius: '20px !important',
            },
            '& .MuiAutocomplete-inputRoot fieldset': {
              borderRadius: '20px !important',
            },
            // Icon color adjustments for dark mode
            '& .MuiSvgIcon-root': {
              color: colors.text.secondary,
            },
            '& .MuiAutocomplete-popupIndicator .MuiSvgIcon-root': {
              color: colors.text.secondary,
            },
            '& .MuiAutocomplete-clearIndicator .MuiSvgIcon-root': {
              color: colors.text.secondary,
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '20px !important',
              backgroundColor:
                mode === 'light'
                  ? 'rgba(255, 255, 255, 0.8)'
                  : 'rgba(30, 41, 59, 0.8)',
              backdropFilter: 'blur(8px)',
              '&:hover': {
                backgroundColor:
                  mode === 'light'
                    ? 'rgba(255, 255, 255, 0.9)'
                    : 'rgba(30, 41, 59, 0.9)',
              },
              '&.Mui-focused': {
                backgroundColor:
                  mode === 'light'
                    ? 'rgba(255, 255, 255, 0.95)'
                    : 'rgba(30, 41, 59, 0.95)',
              },
              '&.Mui-disabled': {
                backgroundColor:
                  mode === 'light'
                    ? 'rgba(0, 0, 0, 0.04)'
                    : 'rgba(255, 255, 255, 0.04)',
              },
            },
            '& .MuiInputLabel-root': {
              color: colors.text.secondary,
              fontWeight: 500,
              fontSize: '0.875rem',
              '&.Mui-disabled': {
                color:
                  mode === 'light'
                    ? 'rgba(0, 0, 0, 0.38)'
                    : 'rgba(255, 255, 255, 0.38)',
              },
            },
            // Icon color adjustments for dark mode
            '& .MuiSvgIcon-root': {
              color: colors.text.secondary,
            },
            '& .MuiInputAdornment-root .MuiSvgIcon-root': {
              color: colors.text.secondary,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor:
              mode === 'light'
                ? 'rgba(255, 255, 255, 0.8)'
                : 'rgba(30, 41, 59, 0.8)',
            backdropFilter: 'blur(8px)',
            borderBottom:
              mode === 'light'
                ? '1px solid rgba(0, 0, 0, 0.05)'
                : '1px solid rgba(255, 255, 255, 0.05)',
          },
        },
      },
      // General icon styling for input fields
      MuiInputAdornment: {
        styleOverrides: {
          root: {
            '& .MuiSvgIcon-root': {
              color: colors.text.secondary,
            },
          },
        },
      },
    },
  })
}

// Default theme (light)
export const theme = createAppTheme('light')
