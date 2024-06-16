import { getApi, postApi, putApi } from '@/lib/axios'
import { ContinueQuizResponse, EndQuizRequest, StartQuizRequest, StartQuizResponse } from '@/services/quiz/type'

export * from './type'

export const quizService = {
  startQuiz(request: StartQuizRequest) {
    return postApi<StartQuizResponse>('/quiz/start_quiz', request)
  },

  countinueQuiz(quizId: string | number) {
    return getApi<ContinueQuizResponse>(`/quiz/continue/${quizId}`)
  },

  saveAnswers(quizId: string | number, request: EndQuizRequest) {
    return putApi<any>(`/quiz/checktime/${quizId}`, request)
  },

  endQuiz(quizId: string | number, request: EndQuizRequest) {
    return postApi<any>(`/quiz/end_quiz/${quizId}`, request)
  },
}
