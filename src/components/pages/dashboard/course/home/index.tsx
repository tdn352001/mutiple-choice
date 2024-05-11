'use client'

import Breadcrumb from '@/components/custom/breadcrumb'
import { CustomLink } from '@/components/custom/link'
import CourseTable from '@/components/pages/dashboard/course/home/course-table'
import { DeleteCourseModal } from '@/components/pages/dashboard/course/home/delete-course-modal'
import SearchCourse from '@/components/pages/dashboard/course/home/search-course'
import Container from '@/components/templates/container'
import Heading from '@/components/templates/heading'
import { courseBreadcrumb } from '@/lib/breadcrumb/course'
import { routers } from '@/lib/constants/routers'
import { DOCUMENTS_DESCRIPTIONS, DOCUMENT_TITLES } from '@/lib/constants/seo'
import { useUserStore } from '@/store/user'
import { Suspense } from 'react'

const CoursePage = () => {
  const isAdmin = useUserStore((state) => state.user?.is_admin)
  return (
    <Container>
      <Breadcrumb items={courseBreadcrumb} />
      <Heading
        title={DOCUMENT_TITLES.DASHBOARD.COURSES.HOME}
        description={DOCUMENTS_DESCRIPTIONS.DASHBOARD.COURSES.HOME}
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
      <DeleteCourseModal />
    </Container>
  )
}

export default CoursePage
