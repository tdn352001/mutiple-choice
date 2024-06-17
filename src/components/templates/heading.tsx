import { Separator } from '@/components/ui/separator'
import { ReactNode } from 'react'

interface HeadingProps {
  className?: string
  title: string
  description?: string
  action?: ReactNode
  secondaryAction?: ReactNode
}

const Heading = ({ className, title, description, action, secondaryAction }: HeadingProps) => {
  return (
    <div className={className}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <div className="flex gap-2">
            <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            {secondaryAction && <div>{secondaryAction}</div>}
          </div>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        <div className="min-h-10">{action}</div>
      </div>
      <Separator className="mt-4" />
    </div>
  )
}

export default Heading
