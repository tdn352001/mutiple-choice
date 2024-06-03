import { AppMutationOptions } from '@/lib/types/queries'
import { UpdateExamRequest, examService } from '@/services/exams'
import { useMutation } from '@tanstack/react-query'

export const useUpdateExamMutation = (id: string | number, options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: async (request: UpdateExamRequest) => {
      return examService.updateExam(id, request)
    },
    ...options,
  })
}
