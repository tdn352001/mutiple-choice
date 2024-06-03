import { dynamicRouters, routers } from '@/lib/constants/routers'
import { DOCUMENT_TITLES } from '@/lib/constants/seo'
import { Exam } from '@/services/exams'
import { Topic } from '@/services/topics'

export const courseListBreadcrumb = [
  {
    title: DOCUMENT_TITLES.DASHBOARD.HOME,
    href: routers.dashboard,
  },
  {
    title: DOCUMENT_TITLES.DASHBOARD.COURSES.HOME,
    href: routers.courses,
  },
]

export const topicListBreadcrumb = [
  {
    title: DOCUMENT_TITLES.DASHBOARD.HOME,
    href: routers.dashboard,
  },
  {
    title: DOCUMENT_TITLES.DASHBOARD.TOPICS.HOME,
    href: routers.topics,
  },
]

export const examListBreadcrumb = [
  {
    title: DOCUMENT_TITLES.DASHBOARD.HOME,
    href: routers.dashboard,
  },
  {
    title: DOCUMENT_TITLES.DASHBOARD.EXAMS.HOME,
    href: routers.exams,
  },
]

export const createCourseBreadcrumb = [
  ...courseListBreadcrumb,
  {
    title: DOCUMENT_TITLES.DASHBOARD.COURSES.CREATE,
    href: routers.createCourse,
  },
]

export const updateCourseBreadcrumb = [
  ...courseListBreadcrumb,
  {
    title: DOCUMENT_TITLES.DASHBOARD.COURSES.UPDATE,
    href: routers.courses,
  },
]

export const getTopicsBreadcrumb = (courseId: number) => [
  ...courseListBreadcrumb,
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
  ...topicListBreadcrumb,
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

export const getUpdateExamsBreadcrumb = (exam: Exam) => [
  ...topicListBreadcrumb,
  {
    title: exam.exam_name,
    href: dynamicRouters.examById(exam.id),
  },
  {
    title: DOCUMENT_TITLES.DASHBOARD.EXAMS.UPDATE,
    href: '#',
  },
]

export const createExamsBreadcrumb = [
  {
    title: DOCUMENT_TITLES.DASHBOARD.HOME,
    href: routers.dashboard,
  },
  {
    title: DOCUMENT_TITLES.DASHBOARD.EXAMS.HOME,
    href: routers.courses,
  },
  {
    title: DOCUMENT_TITLES.DASHBOARD.EXAMS.CREATE,
    href: routers.createExam,
  },
]
