import { AppQueryOptions } from '@/lib/types/queries'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { topicService } from '@/services/topics'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
}

export const useGetTopicsByCourseQuery = (
  courseId: string | number,
  params: BaseApiQueryParams = defaultParams,
  options: AppQueryOptions = {}
) => {
  return useQuery({
    queryKey: ['topics-by-course', courseId, params],
    queryFn: async () => {
      return topicService.getTopicsByCourse(courseId, params).then((res) => res.data)
    },
    ...options,
  })
}

export const useGetTopicsByCourseSuspenseQuery = (
  courseId: string | number,
  params: BaseApiQueryParams = defaultParams,
  options: AppQueryOptions = {}
) => {
  return useSuspenseQuery({
    queryKey: ['topics-by-course', courseId, params],
    queryFn: async () => {
      return topicService.getTopicsByCourse(courseId, params).then((res) => res.data)
    },
    ...options,
  })
}
