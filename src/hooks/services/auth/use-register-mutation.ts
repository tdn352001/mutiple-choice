import { AppMutationOptions } from '@/lib/types/queries'
import { authService } from '@/services/auth'
import { useMutation } from '@tanstack/react-query'

export const useRegisterMutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: authService.register,
    ...options,
  })
}
