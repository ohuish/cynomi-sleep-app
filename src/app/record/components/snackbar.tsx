import { Alert, Button, Snackbar, SnackbarProps } from '@/mui'

export default function RecordSnackbar(props: SnackbarProps) {
  return (
    <Snackbar
      {...props}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      autoHideDuration={6000}
    >
      <Alert
        severity='success'
        variant='filled'
        sx={{ width: '100%' }}
        action={
          <Button color='inherit' size='small' href='/view'>
            View
          </Button>
        }
      >
        Sleep Saved!
      </Alert>
    </Snackbar>
  )
}
