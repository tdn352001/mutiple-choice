import { AppQueryOptions } from '@/lib/types/queries'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { statsService } from '@/services/stats'
import { keepPreviousData, useQuery, useSuspenseQuery } from '@tanstack/react-query'

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
}

type Query = {
  examId: string | number
  params?: BaseApiQueryParams
}

const getQueryOptions = ({ examId, params = defaultParams }: Query) => {
  return {
    queryKey: ['user-by-exam', { examId }, params],
    queryFn: async () => {
      return statsService.getUserByExamHistory(examId, params).then((res) => res.data)
    },
  }
}

export const useGetUserByExamHistoryQuery = (query: Query, options: AppQueryOptions = {}) => {
  return useQuery({
    ...getQueryOptions(query),
    placeholderData: keepPreviousData,
    ...options,
  })
}

export const useGetUserByExamHistorySuspenseQuery = (query: Query, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    ...getQueryOptions(query),
    ...options,
  })
}
