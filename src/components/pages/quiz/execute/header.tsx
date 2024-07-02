import { MobileControlPanel } from '@/components/pages/quiz/execute/mobile-control-panel'
import UserOptions from '@/components/pages/quiz/execute/user-options'
import { SvgIcon } from '@/components/ui/icon'
import { cn } from '@/lib/utils'

export default function Header() {
  return (
    <div className="sticky top-0 border-b bg-background/95 backdrop-blur z-20">
      <nav className="h-14 flex items-center justify-between px-4">
        <div className="hidden lg:block">
          <SvgIcon icon="logo" className="mr-2 h-6 w-6" />
        </div>
        <div className={cn('block lg:!hidden')}>
          <MobileControlPanel />
        </div>

        <UserOptions />
      </nav>
    </div>
  )
}
