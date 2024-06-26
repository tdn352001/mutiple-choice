import { getApi, postApi, putApi } from '@/lib/axios'
import {
  ContinueQuizResponse,
  EndQuizRequest,
  GetQuizResultResponse,
  StartQuizRequest,
  StartQuizResponse,
} from '@/services/quiz/type'

export * from './type'

export const quizService = {
  startQuiz(request: StartQuizRequest) {
    return postApi<StartQuizResponse>('/quiz/start_quiz', request)
  },

  continueQuiz(quizId: string | number) {
    return getApi<ContinueQuizResponse>(`/quiz/continue/${quizId}`)
  },

  saveAnswers(quizId: string | number, request: EndQuizRequest) {
    return putApi<any>(`/quiz/checktime/${quizId}`, request)
  },

  endQuiz(quizId: string | number, request: EndQuizRequest) {
    return postApi<GetQuizResultResponse>(`/quiz/end_quiz/${quizId}`, request)
  },

  getQuizResult(quizId: string | number) {
    return getApi<GetQuizResultResponse>(`/quiz/is_completed/${quizId}`)
  },
}
