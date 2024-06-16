import ThemeToggle from '@/components/layout/dashboard/theme-toggle'
import { routers } from '@/lib/constants/routers'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/user'
import Link from 'next/link'
import { MobileSidebar } from './mobile-sidebar'
import { UserNav } from './user-nav'

interface HeaderProps {
  className?: string
}
export default function Header({ className }: HeaderProps) {
  const isAdmin = useUserStore((state) => state.user?.is_admin)
  return (
    <div className="border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <Link href={isAdmin ? routers.dashboard : routers.courses}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mr-2 h-6 w-6"
            >
              <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
            </svg>
          </Link>
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileSidebar />
        </div>

        <div className="flex items-center gap-2">
          <UserNav />
          <ThemeToggle />
        </div>
      </nav>
    </div>
  )
}
