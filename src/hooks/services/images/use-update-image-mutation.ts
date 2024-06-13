import { AppMutationOptions } from '@/lib/types/queries'
import { UpdateExamImageRequest, imageService } from '@/services/images'
import { useMutation } from '@tanstack/react-query'

export const useUpdateImageMutation = (questionId: string | number, options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: (request: UpdateExamImageRequest) => {
      return imageService.updateImage(questionId, request)
    },
    ...options,
  })
}
