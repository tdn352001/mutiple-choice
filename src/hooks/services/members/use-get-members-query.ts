import { AppQueryOptions } from '@/lib/types/queries'
import { BaseApiQueryParams } from '@/lib/types/query-params'
import { GetMemberParams, memberService } from '@/services/members'
import { keepPreviousData, useQuery, useSuspenseQuery } from '@tanstack/react-query'

const defaultParams: BaseApiQueryParams = {
  page: 1,
  per_page: 10,
}

const getQueryOptions = (params: GetMemberParams = defaultParams) => {
  return {
    queryKey: ['members', params],
    queryFn: async () => {
      return memberService.getMembers(params).then((res) => res.data)
    },
  }
}

export const useGetMembersQuery = (params: GetMemberParams, options: AppQueryOptions = {}) => {
  return useQuery({
    ...getQueryOptions(params),
    placeholderData: keepPreviousData,
    ...options,
  })
}

export const useGetMembersSuspenseQuery = (params: GetMemberParams, options: AppQueryOptions = {}) => {
  return useSuspenseQuery({
    ...getQueryOptions(params),
    ...options,
  })
}
