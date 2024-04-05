'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { PropsWithChildren } from 'react'

export default function ThemeProvider({ children }: PropsWithChildren) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
      {children}
    </NextThemesProvider>
  )
}
