'use client'

import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from '@/dayjs'

export default function RecordLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <LocalizationProvider
      dateAdapter={AdapterDayjs}
      adapterLocale={dayjs.locale()}
    >
      {children}
    </LocalizationProvider>
  )
}
