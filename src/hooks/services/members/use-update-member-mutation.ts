import { AppMutationOptions } from '@/lib/types/queries'
import { UpdateMemberInfoRequest, memberService } from '@/services/members'
import { useMutation } from '@tanstack/react-query'

export const useUpdateMemberProfileMutation = (memberId: string | number, options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: (request: UpdateMemberInfoRequest) => {
      return memberService.updateMemberInfo(memberId, request)
    },
    ...options,
  })
}
