import Breadcrumb from '@/components/custom/breadcrumb'
import Container from '@/components/pages/dashboard/container'
import { nameRouters, routers } from '@/lib/constants/routers'
import React from 'react'

const breadcrumb = [
  {
    title: nameRouters[routers.dashboard],
    href: routers.dashboard,
  },
  {
    title: nameRouters[routers.courses],
    href: routers.courses,
  },
]

const Page = () => {
  return (
    <Container>
      <Breadcrumb items={breadcrumb} />
    </Container>
  )
}

export default Page
