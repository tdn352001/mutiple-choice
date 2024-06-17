import { cn } from '@/lib/utils'
import { MobileControlPanel } from './mobile-control-panel'
import UserOptions from './user-options'

export default function Header() {
  return (
    <div className="sticky top-0 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
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
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileControlPanel />
        </div>

        <UserOptions />
      </nav>
    </div>
  )
}
