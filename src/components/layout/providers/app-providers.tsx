'use client'

import AuthProvider from '@/components/layout/providers/auth-provider'
import { PropsWithChildren, useEffect } from 'react'
import QueryProvider from './query-provider'
import ThemeProvider from './theme-provider'

const AppProviders = ({ children }: PropsWithChildren) => {
  useEffect(() => {
    const shouldPreventDevtools = process.env.NEXT_PUBLIC_PREVENT_DEVTOOL ?? true
    if (!shouldPreventDevtools) return

    const handlePreventContextMenu = (e: MouseEvent) => e.preventDefault()

    const handlePreventShortcut = (e: KeyboardEvent) => {
      const forbiddenKeys = [
        { ctrl: true, shift: true, key: 'I' },
        { ctrl: true, shift: true, key: 'C' },
        { ctrl: true, key: 'U' },
      ]
      if (forbiddenKeys.some((fk) => fk.ctrl === e.ctrlKey && fk.shift === e.shiftKey && fk.key === e.key)) {
        e.preventDefault()
      }
    }

    const handleDetectDevtools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > 160
      const heightThreshold = window.outerHeight - window.innerHeight > 160
      const isDevtoolsOpen = widthThreshold || heightThreshold

      if (isDevtoolsOpen) {
        document.documentElement.style.display = 'none'
        console.log('DevTools is likely open, please close it to continue')
      } else {
        document.documentElement.style.display = 'block'
      }
    }

    handleDetectDevtools()

    window.addEventListener('contextmenu', handlePreventContextMenu)
    window.addEventListener('keydown', handlePreventShortcut)
    window.addEventListener('resize', handleDetectDevtools)

    const interval = setInterval(() => {
      console.clear()
      console.log('DevTools usage is not allowed.')
    }, 5000)

    return () => {
      window.removeEventListener('contextmenu', handlePreventContextMenu)
      window.removeEventListener('keydown', handlePreventShortcut)
      window.removeEventListener('resize', handleDetectDevtools)
      clearInterval(interval)
    }
  }, [])

  return (
    <ThemeProvider>
      <QueryProvider>
        <AuthProvider>{children}</AuthProvider>
      </QueryProvider>
    </ThemeProvider>
  )
}

export default AppProviders
