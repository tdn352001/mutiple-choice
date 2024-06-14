import { AppMutationOptions } from '@/lib/types/queries'
import { memberService } from '@/services/members'
import { useMutation } from '@tanstack/react-query'

export const useDeleteMemberMutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: memberService.deleteMember,
    ...options,
  })
}
