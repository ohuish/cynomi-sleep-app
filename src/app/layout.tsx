import type { Metadata } from 'next'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v13-appRouter'
import { CssBaseline } from '@/mui'
import ToggleColorMode from '@/theme'
import './globals.css'
import Navbar from './components/navbar'

export const metadata: Metadata = {
  title: 'Sleep Tracker App',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ToggleColorMode>
            <CssBaseline />
            <Navbar />
            {children}
          </ToggleColorMode>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
