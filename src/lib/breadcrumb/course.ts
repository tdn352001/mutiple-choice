import { routers } from '@/lib/constants/routers'
import { DOCUMENT_TITLES } from '@/lib/constants/seo'

export const courseBreadcrumb = [
  {
    title: DOCUMENT_TITLES.DASHBOARD.HOME,
    href: routers.dashboard,
  },
  {
    title: DOCUMENT_TITLES.DASHBOARD.COURSES.HOME,
    href: routers.courses,
  },
]

export const createCourseBreadcrumb = [
  ...courseBreadcrumb,
  {
    title: DOCUMENT_TITLES.DASHBOARD.COURSES.CREATE,
    href: routers.createCourse,
  },
]
