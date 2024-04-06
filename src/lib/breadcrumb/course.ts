import { nameRouters, routers } from '@/lib/constants/routers'

export const courseBreadcrumb = [
  {
    title: nameRouters[routers.dashboard],
    href: routers.dashboard,
  },
  {
    title: nameRouters[routers.courses],
    href: routers.courses,
  },
]

export const createCourseBreadcrumb = [
  ...courseBreadcrumb,
  {
    title: nameRouters[routers.createCourse],
    href: routers.createCourse,
  },
]
