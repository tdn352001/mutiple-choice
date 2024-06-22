import { AppQueryOptions } from '@/lib/types/queries'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { GetMemberQuizzesParams, memberService } from '@/services/members'
import { keepPreviousData, useQuery, useSuspenseQuery } from '@tanstack/react-query'

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
}

type Query = {
  memberId: string | number
  examId: string | number
  params?: BaseApiQueryParams
}

const getQueryOptions = (params: GetMemberQuizzesParams) => {
  return {
    queryKey: ['member-quizzes', params],
    queryFn: async () => {
      return memberService.getMemberQuizzesHistory(params).then((res) => res.data)
    },
  }
}

export const useGetMemberQuizzesQuery = (params: GetMemberQuizzesParams, options: AppQueryOptions = {}) => {
  return useQuery({
    staleTime: 60 * 1000,
    placeholderData: keepPreviousData,
    ...getQueryOptions(params),
    ...options,
  })
}

export const useGetMemberQuizzesSuspenseQuery = (params: GetMemberQuizzesParams, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    staleTime: 60 * 1000,
    ...getQueryOptions(params),
    ...options,
  })
}
