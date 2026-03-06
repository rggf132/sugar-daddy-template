'use client'

import { useEffect, useState } from 'react'
import { IconButton, Tooltip, useTheme, alpha } from '@mui/material'
import { ArrowUpward } from '@mui/icons-material'

type ScrollToTopButtonProps = {
  pageElement: HTMLElement | null
}

export const ScrollToTopButton: React.FC<ScrollToTopButtonProps> = ({
  pageElement,
}) => {
  const [visible, setVisible] = useState(false)
  const theme = useTheme()

  const toggleVisible = (e: Event) => {
    const pageElementScrollTop = (e.target as HTMLElement).scrollTop

    setVisible(pageElementScrollTop > 300 ? true : false)
  }

  useEffect(() => {
    if (!pageElement) return

    pageElement.addEventListener('scroll', toggleVisible)
    return () => pageElement.removeEventListener('scroll', toggleVisible)
  }, [pageElement])

  if (!visible) return null

  return (
    <Tooltip title='Back to top'>
      <IconButton
        sx={{
          position: 'fixed',
          width: '45px',
          height: '45px',
          bottom: 20,
          left: '50%',
          right: '50%',
          zIndex: 100,
          backgroundColor: alpha(theme.palette.primary.main, 0.2),
        }}
        onClick={() => {
          if (pageElement) {
            pageElement.scrollTo({
              top: 0,
              behavior: 'smooth',
            })
          }
        }}
      >
        <ArrowUpward color='primary' />
      </IconButton>
    </Tooltip>
  )
}
