import { AppMutationOptions } from '@/lib/types/queries'
import { EndQuizRequest, quizService } from '@/services/quiz'
import { useMutation } from '@tanstack/react-query'

export const useEndQuizMutation = (quizId: number | string, options: AppMutationOptions = {}) => {
  return useMutation({
    mutationKey: ['end-quiz', quizId],
    mutationFn: (request: EndQuizRequest) => {
      return quizService.endQuiz(quizId, request)
    },
    ...options,
  })
}
