import { useIsDesktopMediaQuery } from '@/hooks/use-device'
import AnswersLog from './answers-log'

interface ControlPanelProps {
  className?: string
}

export default function ControlPanel() {
  const isDesktop = useIsDesktopMediaQuery({
    defaultValue: false,
  })

  return (
    isDesktop && (
      <div className="sticky top-[80px] min-h-[calc(100dvh-80px-20px)] flex-shrink-0 w-[16.5rem] h-fit bg-background rounded-lg shadow-md">
        <div className="p-4">
          <AnswersLog />
        </div>
      </div>
    )
  )
}
