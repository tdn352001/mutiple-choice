import { AppQueryOptions, AppQueryOptionsV2 } from '@/lib/types/queries'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { GetTopicsResponseData, topicService } from '@/services/topics'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
}

type UseGetTopicsByCourseQuery = AppQueryOptionsV2<
  GetTopicsResponseData,
  Error,
  GetTopicsResponseData,
  (string | object)[]
>

export const useGetTopicsByCourseQuery = (
  courseId: string | number,
  params: BaseApiQueryParams = defaultParams,
  options: UseGetTopicsByCourseQuery = {}
) => {
  return useQuery({
    queryKey: ['topics', { courseId }, params],
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
