import { AppMutationOptions } from '@/lib/types/queries'
import { CreateQuestionFromCsvRequest, questionService } from '@/services/questions'
import { useMutation } from '@tanstack/react-query'

export const useCreateQuestionsFromCsvMutation = (examId: string | number, options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: (request: CreateQuestionFromCsvRequest) => {
      return questionService.createQuestionFromCsv(examId, request)
    },
    ...options,
  })
}
