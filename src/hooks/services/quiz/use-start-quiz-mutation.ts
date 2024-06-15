import { AppMutationOptions } from '@/lib/types/queries'
import { StartQuizRequest, quizService } from '@/services/quiz'
import { useMutation } from '@tanstack/react-query'

export const useStartQuizMutation = (options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: (request: StartQuizRequest) => {
      return quizService.startQuiz(request)
    },
    ...options,
  })
}
