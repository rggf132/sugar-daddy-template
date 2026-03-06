import { Clear } from '@mui/icons-material'
import { DialogContent, DialogTitle, IconButton, useTheme } from '@mui/material'
import { useModal } from 'src/components/GlobalModal'

type ImagePreviewModalProps = {
  imageUrl?: string
}

export const ImagePreviewModal: React.FC<ImagePreviewModalProps> = ({
  imageUrl,
}) => {
  const { hideModal } = useModal()
  const theme = useTheme()

  return (
    <>
      <DialogTitle
        variant='h5'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
        sx={{ pr: 1, fontSize: 20 }}
      >
        Image Preview
        <IconButton aria-label='close-modal' onClick={hideModal}>
          <Clear />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <img
          src={imageUrl}
          alt='event-image'
          width='100%'
          height='100%'
          style={{
            marginTop: '8px',
            objectFit: 'cover',
          }}
        />
      </DialogContent>
    </>
  )
}
