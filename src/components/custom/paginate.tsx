'use client'

import { buttonVariants } from '@/components/ui/button'
import { PaginationEllipsis } from '@/components/ui/pagination'
import { cn } from '@/lib/utils'
import cx from 'clsx'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { ComponentPropsWithoutRef } from 'react'
import ReactPaginate from 'react-paginate'

type PaginateProps = ComponentPropsWithoutRef<typeof ReactPaginate>

const pageClassnames = cn(
  buttonVariants({
    variant: 'ghost',
    size: 'icon',
  })
)

const previousClassnames = cn(
  buttonVariants({
    variant: 'ghost',
    size: 'default',
    className: 'gap-1 pr-l.5',
  })
)

const nextClassnames = cn(
  buttonVariants({
    variant: 'ghost',
    size: 'default',
    className: 'gap-1 pr-2.5',
  })
)

const activeClassnames = cx('!border !border-input !bg-background !hover:bg-accent !hover:text-accent-foreground')

const Paginate = ({ className, ...props }: PaginateProps) => {
  if (props.pageCount <= 1) {
    return null
  }

  return (
    <ReactPaginate
      className={cn('w-full mx-auto flex flex-row items-center justify-center gap-1', className)}
      previousLinkClassName={previousClassnames}
      nextLinkClassName={nextClassnames}
      pageLinkClassName={pageClassnames}
      activeLinkClassName={activeClassnames}
      breakClassName={pageClassnames}
      disabledLinkClassName="pointer-events-none opacity-40"
      previousLabel={
        <>
          <ChevronLeft className="h-4 w-4" />
          <span>Previous</span>
        </>
      }
      nextLabel={
        <>
          <span>Next</span>
          <ChevronRight className="h-4 w-4" />
        </>
      }
      breakLabel={<PaginationEllipsis />}
      {...props}
    />
  )
}

export default Paginate
