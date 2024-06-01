import { AppMutationOptions } from '@/lib/types/queries'
import { examService } from '@/services/exams'
import { useMutation } from '@tanstack/react-query'

export const useCreateExamMutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: examService.createExam,
    ...options,
  })
}
