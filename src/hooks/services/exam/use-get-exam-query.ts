import { AppQueryOptions } from '@/lib/types/queries'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { examService } from '@/services/exams'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
}

type GetExamsQuery = {
  topicId?: string | number
  params?: BaseApiQueryParams
}

const getQueryOptions = ({ topicId, params = defaultParams }: GetExamsQuery) => {
  const queryKey = topicId ? ['exams', { topicId }, params] : ['exams', params]
  return {
    queryKey,
    queryFn: async () => {
      if (topicId) {
        return examService.getExamsByTopic(topicId, params).then((res) => res.data)
      }

      return examService.getExams(params).then((res) => res.data)
    },
  }
}

export const useGetExamsQuery = (query: GetExamsQuery, options: AppQueryOptions = {}) => {
  return useQuery({
    ...getQueryOptions(query),
    ...options,
  })
}

export const useGetExamsSuspenseQuery = (query: GetExamsQuery, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    ...getQueryOptions(query),
    ...options,
  })
}
