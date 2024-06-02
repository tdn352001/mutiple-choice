import { AppQueryOptions } from '@/lib/types/queries'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { examService } from '@/services/exams'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
}

export const useGetExamsByTopicQuery = (
  topicId: string | number,
  params: BaseApiQueryParams = defaultParams,
  options: AppQueryOptions = {}
) => {
  return useQuery({
    queryKey: ['topics-by-course', topicId, params],
    queryFn: async () => {
      return examService.getExamsByTopic(topicId, params).then((res) => res.data)
    },
    ...options,
  })
}

export const useGetExamsByTopicSuspenseQuery = (
  topicId: string | number,
  params: BaseApiQueryParams = defaultParams,
  options: AppQueryOptions = {}
) => {
  return useSuspenseQuery({
    queryKey: ['topics-by-course', topicId, params],
    queryFn: async () => {
      return examService.getExamsByTopic(topicId, params).then((res) => res.data)
    },
    ...options,
  })
}
