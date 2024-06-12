import { AppMutationOptions } from '@/lib/types/queries'
import { UploadExamImagesRequest, imageService } from '@/services/images'
import { useMutation } from '@tanstack/react-query'

export const useUploadImagesMutation = (examId: string | number, options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: (request: UploadExamImagesRequest) => {
      return imageService.uploadImages(examId, request)
    },
    ...options,
  })
}
