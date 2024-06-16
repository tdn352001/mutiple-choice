import { AppMutationOptions } from '@/lib/types/queries'
import { SaveAnswersRequest, quizService } from '@/services/quiz'
import { useMutation } from '@tanstack/react-query'

export const useSaveUserAnswersMutation = (quizId: number | string, options: AppMutationOptions = {}) => {
  return useMutation({
    mutationFn: (request: SaveAnswersRequest) => {
      return quizService.saveAnswers(quizId, request)
    },
    ...options,
  })
}
