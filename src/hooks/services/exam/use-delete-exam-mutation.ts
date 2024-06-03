import { AppMutationOptions } from '@/lib/types/queries'
import { examService } from '@/services/exams'
import { useMutation } from '@tanstack/react-query'

export const useDeleteExamMutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: examService.deleteExam,
    ...options,
  })
}
