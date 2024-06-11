'use client'

import * as RadixCheckbox from '@radix-ui/react-checkbox'
import { Check } from 'lucide-react'
import * as React from 'react'

import { cn } from '@/lib/utils'

const Checkbox = React.forwardRef<
  React.ElementRef<typeof RadixCheckbox.Root>,
  React.ComponentPropsWithoutRef<typeof RadixCheckbox.Root>
>(({ className, ...props }, ref) => (
  <RadixCheckbox.Root
    ref={ref}
    className={cn(
      'peer h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=checked]:text-primary-foreground',
      className
    )}
    {...props}
  >
    <RadixCheckbox.Indicator className={cn('flex items-center justify-center text-current')}>
      <Check className="h-4 w-4" />
    </RadixCheckbox.Indicator>
  </RadixCheckbox.Root>
))
Checkbox.displayName = RadixCheckbox.Root.displayName

const CheckboxPrimitive = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, ...props }, ref) => {
    return (
      <label
        className={cn(
          'peer group cursor-pointer relative h-4 w-4 shrink-0 rounded-sm border border-primary ring-offset-background ',
          'has-[:focus-visible]:outline-none has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 has-[disabled]:cursor-not-allowed has-[disabled]:opacity-50 has-[:checked]:bg-primary has-[:checked]:text-primary-foreground',
          className
        )}
      >
        <input className="absolute inset-0 opacity-0 z-10 cursor-pointer" type="checkbox" ref={ref} {...props} />
        <div className="flex items-center justify-center text-current opacity-0 transition-opacity group-has-[:checked]:opacity-100">
          <Check className="h-4 w-4" />
        </div>
      </label>
    )
  }
)
CheckboxPrimitive.displayName = 'CheckboxPrimitive'

export { Checkbox, CheckboxPrimitive }
