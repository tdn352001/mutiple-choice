'use client'

import Breadcrumb from '@/components/custom/breadcrumb'
import { CustomLink } from '@/components/custom/link'
import Container from '@/components/pages/dashboard/container'
import Heading from '@/components/pages/heading'
import { courseBreadcrumb } from '@/lib/breadcrumb/course'
import { routers } from '@/lib/constants/routers'
import { getDocumentTitle } from '@/lib/get-document-title'
import { Metadata } from 'next'
import React, { Suspense } from 'react'
import { useUserStore } from '@/store/user'
import SearchCourse from '@/components/pages/dashboard/course/search-course'
import CourseTable from '@/components/pages/dashboard/course/course-table'

const Page = () => {
  const isAdmin = useUserStore((state) => state.user?.is_admin)
  return (
    <Container>
      <Breadcrumb items={courseBreadcrumb} />
      <Heading
        title="Các khóa học"
        description="Quản lý các khoá học."
        action={
          isAdmin && (
            <CustomLink href={routers.createCourse} icon="Plus">
              Thêm khóa học
            </CustomLink>
          )
        }
      />
      <div>
        <Suspense>
          <SearchCourse />
        </Suspense>
        <Suspense>
          <CourseTable />
        </Suspense>
      </div>
    </Container>
  )
}

export default Page
