import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { Search } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { useDebouncedCallback } from 'use-debounce'

interface SearchBoxProps {
  className?: string
  defaultValue?: string
  value?: string
  onChange?: (value: string) => void
  onSubmit?: (value: string) => void
  autoFocus?: boolean
  placeholder?: string
}

const SearchBox = ({ className, value, onChange, autoFocus, placeholder }: SearchBoxProps) => {
  const [keyword, setKeyword] = useState(value || '')

  const propagateChange = useDebouncedCallback((value: string) => {
    onChange?.(value)
  }, 300)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value || ''
    setKeyword(value)
    propagateChange(value)
  }

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    keyword && propagateChange?.(keyword)
  }

  useEffect(() => {
    setKeyword(value || '')
  }, [value])

  return (
    <form className={cn('relative w-full max-w-96', className)} onSubmit={handleFormSubmit}>
      <Search className="size-4 absolute top-1/2 left-2 -translate-y-1/2" />
      <Input
        className="pl-9 w-full !ring-transparent focus-visible:border-foreground/50"
        value={keyword}
        onChange={handleInputChange}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    </form>
  )
}

export default SearchBox
