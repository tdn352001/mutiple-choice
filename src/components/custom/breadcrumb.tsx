import React from 'react'

import {
  Breadcrumb as BreadCrumbRoot,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import Link from 'next/link'

type BreadcrumbItem = {
  href: string
  title: string
  page?: boolean
}

type CustomBreadcrumbItemProps = Omit<React.ComponentPropsWithoutRef<'li'>, 'children'> & BreadcrumbItem

const CustomBreadcrumbItem = ({ title, href, page, ...props }: CustomBreadcrumbItemProps) => {
  if (page) {
    return (
      <BreadcrumbItem {...props}>
        <BreadcrumbPage>{title}</BreadcrumbPage>
      </BreadcrumbItem>
    )
  }

  return (
    <>
      <BreadcrumbItem {...props}>
        <BreadcrumbLink asChild>
          <Link href={href}>{title}</Link>
        </BreadcrumbLink>
      </BreadcrumbItem>
      <BreadcrumbSeparator />
    </>
  )
}

interface BreadcrumbProps {
  className?: string
  items: BreadcrumbItem[]
}

const Breadcrumb = ({ className, items }: BreadcrumbProps) => {
  return (
    <BreadCrumbRoot className={className}>
      <BreadcrumbList>
        {items.map((item, index) => (
          <CustomBreadcrumbItem key={index} {...item} page={index === items.length - 1} />
        ))}
      </BreadcrumbList>
    </BreadCrumbRoot>
  )
}

export default Breadcrumb
