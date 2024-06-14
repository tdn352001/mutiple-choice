import { AppMutationOptions } from '@/lib/types/queries'
import { UpdateMemberPasswordRequest, memberService } from '@/services/members'
import { useMutation } from '@tanstack/react-query'

export const useUpdateMemberPasswordMutation = (memberId: string | number, options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: (request: UpdateMemberPasswordRequest) => {
      return memberService.updateMemberPassword(memberId, request)
    },
    ...options,
  })
}
