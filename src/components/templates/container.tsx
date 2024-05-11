import { cn } from '@/lib/utils'
import React from 'react'

type ContainerProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>

const Container = ({ className, children, ...props }: ContainerProps) => {
  return (
    <div className={cn('flex-1 space-y-4 p-4 md:p-8 pt-6', className)} {...props}>
      {children}
    </div>
  )
}

export default Container
