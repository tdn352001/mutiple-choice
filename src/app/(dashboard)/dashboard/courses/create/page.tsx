import Breadcrumb from '@/components/custom/breadcrumb'
import Container from '@/components/pages/dashboard/container'
import Heading from '@/components/pages/heading'
import { createCourseBreadcrumb } from '@/lib/breadcrumb/course'
import { routers } from '@/lib/constants/routers'
import { getDocumentTitle } from '@/lib/get-document-title'
import { Metadata } from 'next'
import React from 'react'

const Page = () => {
  return (
    <Container>
      <Breadcrumb items={createCourseBreadcrumb} />
      <Heading title={getDocumentTitle({ pathname: routers.createCourse })} description="Tạo mới một khóa học" />
    </Container>
  )
}

export const metadata: Metadata = {
  title: getDocumentTitle({ pathname: routers.createCourse }),
}

export default Page
