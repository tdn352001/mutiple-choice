import { AppMutationOptions } from '@/lib/types/queries'
import { memberService } from '@/services/members'
import { useMutation } from '@tanstack/react-query'

export const useCreateMemberMutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: memberService.createMember,
    ...options,
  })
}
