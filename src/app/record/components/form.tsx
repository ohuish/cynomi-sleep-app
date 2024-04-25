'use client'
import * as React from 'react'
import { useFormState, useFormStatus } from 'react-dom'
import {
  Alert,
  Button,
  DatePicker,
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  TextField,
} from '@/mui'
import { recordSleep } from '@/app/actions'
import dayjs from '@/dayjs'
import RecordSnackbar from './snackbar'
import type { RecordSleepResult } from '@/types'

const genders = [
  {
    value: 'MALE',
    text: 'Male',
  },
  {
    value: 'FEMALE',
    text: 'Female',
  },
  {
    value: 'OTHER',
    text: 'Other',
  },
]

const initialState: RecordSleepResult = {
  success: false,
}

export default function RecordForm() {
  const [state, formAction] = useFormState(recordSleep, initialState)
  const [formKey, setFormKey] = React.useState(Date.now())
  const [gender, setGender] = React.useState('')
  const [showSnackbar, setShowSnackbar] = React.useState<boolean>(false)

  const handleChange = (event: SelectChangeEvent) => {
    setGender(event.target.value as string)
  }

  React.useEffect(() => {
    if (state.success) {
      setShowSnackbar(true)
      // reset the form
      setFormKey(Date.now())
      setGender('')
    }
  }, [state])

  const SubmitButton = () => {
    // pending as a child of <form />
    const { pending } = useFormStatus()
    return (
      <Button disabled={pending} type='submit'>
        Submit
      </Button>
    )
  }

  return (
    <form action={formAction} key={formKey}>
      <RecordSnackbar
        open={showSnackbar}
        onClose={() => setShowSnackbar(false)}
      />
      <Stack spacing={2}>
        <TextField
          required
          name='name'
          label='Name'
          variant='outlined'
          error={!!state?.errors?.name?.[0]}
          helperText={state?.errors?.name?.[0]}
        />
        <FormControl required variant='outlined'>
          <InputLabel id='gender-select-label'>Gender</InputLabel>
          <Select
            labelId='gender-select-label'
            name='gender'
            label='Gender'
            value={gender}
            onChange={handleChange}
            error={!!state?.errors?.gender?.[0]}
          >
            {genders.map(({ value, text }) => (
              <MenuItem key={value} value={value}>
                {text}
              </MenuItem>
            ))}
          </Select>
          <FormHelperText error={!!state?.errors?.gender?.[0]}>
            {state?.errors?.gender?.[0]}
          </FormHelperText>
        </FormControl>
        <DatePicker
          name='date'
          label='Date'
          maxDate={dayjs.utc().startOf('day').subtract(1, 'days')}
          slotProps={{
            textField: {
              required: true,
              error: !!state?.errors?.date?.[0],
              helperText: state?.errors?.date?.[0],
            },
          }}
        />
        <TextField
          required
          name='hours'
          label='Hours Slept'
          variant='outlined'
          error={!!state?.errors?.hours?.[0]}
          helperText={state?.errors?.hours?.[0]}
        />
        <SubmitButton />
      </Stack>
    </form>
  )
}
