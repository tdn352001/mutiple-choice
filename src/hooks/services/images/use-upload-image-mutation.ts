import { AppMutationOptions } from '@/lib/types/queries'
import { UploadExamImageRequest, imageService } from '@/services/images'
import { useMutation } from '@tanstack/react-query'

export const useUploadImageMutation = (examId: string | number, options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: (request: UploadExamImageRequest) => {
      return imageService.uploadImage(examId, request)
    },
    ...options,
  })
}
