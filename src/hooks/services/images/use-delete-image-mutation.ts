import { AppMutationOptions } from '@/lib/types/queries'
import { imageService } from '@/services/images'
import { useMutation } from '@tanstack/react-query'

export const useDeleteImageMutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: imageService.deleteImage,
    ...options,
  })
}
