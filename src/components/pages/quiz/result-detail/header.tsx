import { routers } from '@/lib/constants/routers'
import { cn } from '@/lib/utils'
import { useUserStore } from '@/store/user'
import Link from 'next/link'
import { MobileControlPanel } from './mobile-control-panel'
import UserOptions from './user-options'

export default function Header() {
  const isAdmin = useUserStore((state) => state.user?.is_admin)
  
  return (
    <div className="sticky top-0 border-b bg-background/95 backdrop-blur z-20">
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
          <MobileControlPanel />
        </div>

        <UserOptions />
      </nav>
    </div>
  )
}
