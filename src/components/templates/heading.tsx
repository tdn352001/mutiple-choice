import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'
import React, { ReactNode } from 'react'

interface HeadingProps {
  className?: string
  title: string
  description?: string
  action?: ReactNode
}

const Heading = ({ className, title, description, action }: HeadingProps) => {
  return (
    <div className={cn('', className)}>
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
          {description && <p className="text-sm text-muted-foreground">{description}</p>}
        </div>
        {action && <div>{action}</div>}
      </div>
      <Separator className="mt-4" />
    </div>
  )
}

export default Heading
