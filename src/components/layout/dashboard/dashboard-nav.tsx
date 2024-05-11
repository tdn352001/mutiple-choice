'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/ui/icon'
import { navItems } from '@/lib/constants/nav'
import { cn } from '@/lib/utils'
import { Dispatch, SetStateAction } from 'react'

interface DashboardNavProps {
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export function DashboardNav({ setOpen }: DashboardNavProps) {
  const path = usePathname()

  return (
    <nav className="grid items-start gap-2">
      {navItems.map((item, index) => {
        return (
          item.href && (
            <Link
              key={index}
              href={item.disabled ? '/' : item.href}
              onClick={() => {
                if (setOpen) setOpen(false)
              }}
            >
              <span
                className={cn(
                  'group flex items-center rounded-md px-3 py-2 text-sm font-medium hover:bg-accent hover:text-accent-foreground',
                  path === item.href ? 'bg-accent' : 'transparent',
                  item.disabled && 'cursor-not-allowed opacity-80'
                )}
              >
                <Icon name={item.icon || 'AArrowDown'} className="mr-2 h-4 w-4" />
                <span>{item.title}</span>
              </span>
            </Link>
          )
        )
      })}
    </nav>
  )
}
