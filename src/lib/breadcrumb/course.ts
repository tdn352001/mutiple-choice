import { dynamicRouters, routers } from '@/lib/constants/routers'
import { DOCUMENT_TITLES } from '@/lib/constants/seo'
import { Topic } from '@/services/topics'

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

export const getCreateTopicsBreadcrumb = () => [
  {
    title: DOCUMENT_TITLES.DASHBOARD.HOME,
    href: routers.dashboard,
  },
  {
    title: DOCUMENT_TITLES.DASHBOARD.TOPICS.HOME,
    href: routers.courses,
  },
  {
    title: DOCUMENT_TITLES.DASHBOARD.TOPICS.CREATE,
    href: '#',
  },
]

export const getUpdateTopicsBreadcrumb = (topic: Topic) => [
  {
    title: DOCUMENT_TITLES.DASHBOARD.HOME,
    href: routers.dashboard,
  },
  {
    title: DOCUMENT_TITLES.DASHBOARD.TOPICS.HOME,
    href: dynamicRouters.courseById(topic.course_id),
  },
  {
    title: topic.topic_name,
    href: dynamicRouters.topicById(topic.id),
  },
  {
    title: DOCUMENT_TITLES.DASHBOARD.TOPICS.UPDATE,
    href: '#',
  },
]

export const getExamsBreadcrumb = (topic: Topic) => [
  {
    title: DOCUMENT_TITLES.DASHBOARD.HOME,
    href: routers.dashboard,
  },
  {
    title: DOCUMENT_TITLES.DASHBOARD.TOPICS.HOME,
    href: dynamicRouters.courseById(topic.course_id),
  },
  {
    title: topic.topic_name,
    href: dynamicRouters.topicById(topic.id),
  },
]
