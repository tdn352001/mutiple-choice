'use client'

import ThemeProvider from './theme-toggle/theme-provider'

interface ProvidersProps {
  children?: React.ReactNode
}

const Providers = ({ children }: ProvidersProps) => {
  return <ThemeProvider>{children}</ThemeProvider>
}

export default Providers
