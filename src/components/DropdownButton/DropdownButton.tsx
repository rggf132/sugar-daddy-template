'use client'

import React, { useEffect } from 'react'
import { DropdownButtonProps } from './types'
import { styled } from '@mui/system'
import { Button, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import { Close } from '@mui/icons-material'
import { sx } from 'src/core/helpers/sx'

const StyledMenu = styled(Menu)<{ buttonWidth: number }>`
  & .MuiPaper-root {
    ${sx({
      mt: 0.5,
      '.MuiMenuItem-gutters': { px: 1 },
      '.MuiSvgIcon-root': { color: 'grey.600' },
    })}
    ${({ buttonWidth }) => buttonWidth && { minWidth: buttonWidth }};
  }
`

const StyledButton = styled(Button)<{ collapsed: boolean }>`
  .MuiSvgIcon-root {
    font-size: 24px;
  }
  ${({ collapsed }) => {
    return (
      collapsed &&
      sx({
        '&.MuiButton-root': {
          justifyContent: 'center',
          padding: '0.5625rem',
          minWidth: '2.625rem',
          maxWidth: '2.625rem',
        },
        '.MuiButton-startIcon, .MuiButton-endIcon': { mx: 0 },
      })
    )
  }}
`

const DropdownButton: React.FC<DropdownButtonProps> = ({
  label,
  options,
  onSelect,
  fullWidth,
  denseOptions,
  collapsed,
  renderButton,
  withCloseOption,
  ...props
}) => {
  const [anchorElement, setAnchorElement] = React.useState<HTMLElement | null>()
  const [buttonWidth, setButtonWidth] = React.useState(0)
  const anchorOffsetWidth = anchorElement?.offsetWidth || buttonWidth
  useEffect(() => {
    setButtonWidth(anchorOffsetWidth)
  }, [anchorOffsetWidth])

  const open = Boolean(anchorElement)
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElement(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorElement(null)
  }

  const optionsHaveIcons = options?.some((option) => option.icon)

  return (
    <>
      <Tooltip title={label} disableHoverListener={!collapsed}>
        {renderButton ? (
          renderButton(handleClick)
        ) : (
          <StyledButton
            data-test='dropdown-btn'
            onClick={handleClick}
            fullWidth={fullWidth}
            collapsed={collapsed ?? false}
            {...props}
          >
            {!collapsed && label}
          </StyledButton>
        )}
      </Tooltip>

      {open && (
        <StyledMenu
          open={open}
          anchorEl={anchorElement}
          onClose={handleClose}
          buttonWidth={fullWidth ? buttonWidth : 0}
        >
          {options?.map(
            (
              { title, icon, value, onSelect: onItemSelect, ...option },
              index,
            ) => {
              return (
                <MenuItem
                  key={index}
                  onClick={(e) => {
                    if (onItemSelect) onItemSelect(value)
                    if (onSelect) onSelect(value)
                    handleClose()
                    e.stopPropagation()
                  }}
                  dense={denseOptions}
                  {...option}
                >
                  {icon}
                  <Typography
                    ml={icon ? 1 : 0}
                    data-test={`dropdown-option-${index}`}
                  >
                    {title}
                  </Typography>
                </MenuItem>
              )
            },
          )}
          {withCloseOption && (
            <MenuItem
              key={'close'}
              onClick={(e) => {
                handleClose()
                e.stopPropagation()
              }}
              dense={denseOptions}
            >
              {optionsHaveIcons && <Close />}
              <Typography
                ml={optionsHaveIcons ? 1 : 0}
                data-test={`dropdown-option-close`}
              >
                Close
              </Typography>
            </MenuItem>
          )}
        </StyledMenu>
      )}
    </>
  )
}

export { DropdownButton }
