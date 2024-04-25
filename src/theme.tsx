'use client'
import * as React from 'react'
import { Roboto } from 'next/font/google'
import { createTheme, ThemeProvider, useMediaQuery } from '@/mui'

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
})

export const ColorModeContext = React.createContext({
  toggleColorMode: () => {},
})

export default function ToggleColorMode({
  children,
}: {
  children: React.ReactNode
}) {
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)')
  const [mode, setMode] = React.useState<'light' | 'dark'>('light')

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
      },
    }),
    [],
  )
  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
        typography: {
          fontFamily: roboto.style.fontFamily,
        },
      }),
    [mode],
  )

  React.useEffect(() => {
    setMode(prefersDarkMode ? 'dark' : 'light')
  }, [prefersDarkMode])

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ColorModeContext.Provider>
  )
}
