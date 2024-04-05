'use client'

import ThemeProvider from './theme-provider'
import QueryProvider from './query-provider'

interface ProvidersProps {
  children?: React.ReactNode
}

const AppProviders = ({ children }: ProvidersProps) => {
  return (
    <ThemeProvider>
      <QueryProvider>{children}</QueryProvider>
    </ThemeProvider>
  )
}

export default AppProviders
