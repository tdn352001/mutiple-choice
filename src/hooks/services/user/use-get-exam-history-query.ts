import { AppQueryOptions } from '@/lib/types/queries'
import { GetExamHistoryParams, userService } from '@/services/user'
import { useQuery, useSuspenseQuery } from '@tanstack/react-query'

export const useGetExamHistoryQuery = (params: GetExamHistoryParams, options: AppQueryOptions = {}) => {
  return useQuery({
    queryKey: ['exam-history', params],
    queryFn: () => userService.getExamHistory(params).then((res) => res.data),
    staleTime: 2 * 60 * 1000,
    ...options,
  })
}

export const useGetExamHistorySuspenseQuery = (params: GetExamHistoryParams, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    queryKey: ['exam-history', params],
    queryFn: () => userService.getExamHistory(params).then((res) => res.data),
    staleTime: 2 * 60 * 1000,
    ...options,
  })
}
