'use client'

import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import * as React from 'react'

import { cn } from '@/lib/utils'

type ScrollAreaProps = React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root> & {
  viewportOptions?: React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.Root>
  viewportRef?: React.RefObject<HTMLDivElement>
}
const ScrollArea = React.forwardRef<React.ElementRef<typeof ScrollAreaPrimitive.Root>, ScrollAreaProps>(
  ({ className, children, viewportOptions = {}, viewportRef, ...props }, ref) => {
    const { className: vpClassName, ...viewportOpts } = viewportOptions

    return (
      <ScrollAreaPrimitive.Root ref={ref} className={cn('relative overflow-hidden', className)} {...props}>
        <ScrollAreaPrimitive.Viewport
          className={cn('h-full w-full rounded-[inherit]', vpClassName)}
          {...viewportOpts}
          ref={viewportRef}
        >
          {children}
        </ScrollAreaPrimitive.Viewport>
        <ScrollBar />
        <ScrollAreaPrimitive.Corner />
      </ScrollAreaPrimitive.Root>
    )
  }
)
ScrollArea.displayName = ScrollAreaPrimitive.Root.displayName

const ScrollBar = React.forwardRef<
  React.ElementRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>,
  React.ComponentPropsWithoutRef<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>
>(({ className, orientation = 'vertical', ...props }, ref) => (
  <ScrollAreaPrimitive.ScrollAreaScrollbar
    ref={ref}
    orientation={orientation}
    className={cn(
      'flex touch-none select-none transition-colors',
      orientation === 'vertical' && 'h-full w-2.5 border-l border-l-transparent p-[1px]',
      orientation === 'horizontal' && 'h-2.5 flex-col border-t border-t-transparent p-[1px]',
      className
    )}
    {...props}
  >
    <ScrollAreaPrimitive.ScrollAreaThumb className="relative flex-1 rounded-full bg-border" />
  </ScrollAreaPrimitive.ScrollAreaScrollbar>
))
ScrollBar.displayName = ScrollAreaPrimitive.ScrollAreaScrollbar.displayName

interface ScrollAreaV2Props extends React.ComponentPropsWithoutRef<typeof ScrollArea> {}

const ScrollAreaV2Context = React.createContext<{ viewportRef: React.RefObject<HTMLDivElement> } | null>(null)

const ScrollAreaV2 = ({ ...props }: ScrollAreaV2Props) => {
  const viewportRef = React.useRef<HTMLDivElement>(null)
  return (
    <ScrollAreaV2Context.Provider value={{ viewportRef }}>
      <ScrollArea {...props} viewportRef={viewportRef} />
    </ScrollAreaV2Context.Provider>
  )
}

const useViewPortRef = () => {
  const context = React.useContext(ScrollAreaV2Context)
  if (!context) {
    throw new Error('useViewPortRef must be used within a ScrollAreaV2')
  }
  return context.viewportRef
}

export { ScrollArea, ScrollAreaV2, ScrollBar, useViewPortRef }
