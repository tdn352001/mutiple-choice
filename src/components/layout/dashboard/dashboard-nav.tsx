'use client'

import { Icon, IconName } from '@/components/ui/icon'
import { routers } from '@/lib/constants/routers'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/user'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Dispatch, SetStateAction, useMemo } from 'react'

export interface NavItem {
  title: string
  href?: string
  disabled?: boolean
  external?: boolean
  icon?: IconName
  label?: string
  description?: string
}

const baseNavItems: NavItem[] = [
  {
    title: 'Courses',
    href: routers.courses,
    icon: 'School',
  },
  {
    title: 'Topics',
    href: routers.topics,
    icon: 'Layers3',
  },
  {
    title: 'Exams',
    href: routers.exams,
    icon: 'SquareMenu',
  },
]

interface DashboardNavProps {
  setOpen?: Dispatch<SetStateAction<boolean>>
}

export function DashboardNav({ setOpen }: DashboardNavProps) {
  const path = usePathname()

  const isAdmin = useUserStore((state) => state.user?.is_admin)

  const navItems = useMemo(() => {
    const items = [...baseNavItems]

    if (isAdmin) {
      items.push({
        title: 'Users',
        href: routers.users,
        icon: 'Users',
      })
    }

    return items
  }, [isAdmin])

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
