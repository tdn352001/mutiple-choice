import { AppMutationOptions } from '@/lib/types/queries'
import { memberService } from '@/services/members'
import { useMutation } from '@tanstack/react-query'

export const useCreateMemberFromCsvMutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: memberService.createMemberFromCsv,
    ...options,
  })
}
