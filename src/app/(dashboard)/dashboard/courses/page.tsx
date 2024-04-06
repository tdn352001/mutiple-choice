import Breadcrumb from '@/components/custom/breadcrumb'
import { CustomLink } from '@/components/custom/link'
import Container from '@/components/pages/dashboard/container'
import Heading from '@/components/pages/heading'
import { buttonVariants } from '@/components/ui/button'
import { Icon } from '@/components/ui/icon'
import { courseBreadcrumb } from '@/lib/breadcrumb/course'
import { nameRouters, routers } from '@/lib/constants/routers'
import { getDocumentTitle } from '@/lib/get-document-title'
import { cn } from '@/lib/utils'
import { Metadata } from 'next'
import Link from 'next/link'
import React from 'react'

const Page = () => {
  return (
    <Container>
      <Breadcrumb items={courseBreadcrumb} />
      <Heading
        title="Các khóa học"
        description="Quản lý các khoá học."
        action={
          <CustomLink href={routers.createCourse} icon="Plus">
            Thêm khóa học
          </CustomLink>
        }
      />
    </Container>
  )
}

export const metadata: Metadata = {
  title: getDocumentTitle({ pathname: routers.courses }),
}

export default Page
