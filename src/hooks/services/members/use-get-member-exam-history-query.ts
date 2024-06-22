import { AppQueryOptions } from '@/lib/types/queries'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { memberService } from '@/services/members'
import { keepPreviousData, useQuery, useSuspenseQuery } from '@tanstack/react-query'

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
}

type Query = {
  memberId: string | number
  params?: BaseApiQueryParams
}

const getQueryOptions = ({ memberId, params = defaultParams }: Query) => {
  return {
    queryKey: ['member-exam-history', memberId, params],
    queryFn: async () => {
      return memberService.getMemberExamHistory(memberId, params).then((res) => res.data)
    },
  }
}

export const useGetMemberExamHistoryQuery = (query: Query, options: AppQueryOptions = {}) => {
  return useQuery({
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
    ...getQueryOptions(query),
    ...options,
  })
}

export const useGetMemberExamHistorySuspenseQuery = (query: Query, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    staleTime: 60 * 1000,
    ...getQueryOptions(query),
    ...options,
  })
}
