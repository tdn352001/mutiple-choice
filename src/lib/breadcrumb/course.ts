import { dynamicRouters, routers } from '@/lib/constants/routers'
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

export const updateCourseBreadcrumb = [
  ...courseBreadcrumb,
  {
    title: DOCUMENT_TITLES.DASHBOARD.COURSES.UPDATE,
    href: routers.courses,
  },
]

export const getTopicsBreadcrumb = (courseId: number) => [
  ...courseBreadcrumb,
  {
    title: DOCUMENT_TITLES.DASHBOARD.TOPICS.HOME,
    href: dynamicRouters.courseById(courseId),
  },
]

export const getCreateTopicsBreadcrumb = (courseId: number) => [
  ...getTopicsBreadcrumb(courseId),
  {
    title: DOCUMENT_TITLES.DASHBOARD.TOPICS.CREATE,
    href: dynamicRouters.createTopic(courseId),
  },
]
