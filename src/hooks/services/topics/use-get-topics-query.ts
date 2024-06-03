import { AppQueryOptions } from '@/lib/types/queries'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { topicService } from '@/services/topics'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
}

type GetTopicsQuery = {
  courseId?: string | number
  params?: BaseApiQueryParams
}

const getQueryOptions = ({ courseId, params = defaultParams }: GetTopicsQuery) => {
  const queryKey = courseId ? ['topics', { courseId }, params] : ['topics', params]
  return {
    queryKey,
    queryFn: async () => {
      if (courseId) {
        return topicService.getTopicsByCourse(courseId, params).then((res) => res.data)
      }

      return topicService.getTopics(params).then((res) => res.data)
    },
  }
}

export const useGetTopicsQuery = (query: GetTopicsQuery, options: AppQueryOptions = {}) => {
  return useQuery({
    ...getQueryOptions(query),
    ...options,
  })
}

export const useGetTopicsSuspenseQuery = (query: GetTopicsQuery, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    ...getQueryOptions(query),
    ...options,
  })
}
