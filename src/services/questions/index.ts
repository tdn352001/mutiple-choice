import { deleteApi, getApi, postApi, postFormApi, putApi } from '@/lib/axios'
import {
  CreateAnswerRequest,
  CreateQuestionFromCsvRequest,
  CreateQuestionFromCsvResponse,
  CreateQuestionRequest,
  CreateQuestionV2Request,
  GetQuestionByIdResponse,
  GetQuestionsQueryParams,
  GetQuestionsResponse,
  UpdateAnswerRequest,
  UpdateQuestionRequest,
} from './type'

export * from './type'

export const questionService = {
  getQuestions(params?: GetQuestionsQueryParams) {
    return getApi<GetQuestionsResponse>('/question', {
      params,
    })
  },
  getQuestionsByExam(exam_id: string | number, params?: GetQuestionsQueryParams) {
    return getApi<GetQuestionsResponse>(`/question/exam/${exam_id}`, {
      params,
    })
  },
  getQuestionById(id: string | number) {
    return getApi<GetQuestionByIdResponse>(`/question/${id}`)
  },

  createQuestion(request: CreateQuestionRequest) {
    return postApi('/question', request)
  },

  createQuestionV2(request: CreateQuestionV2Request) {
    return postApi('/question/v2', request)
  },

  createQuestionFromCsv(exam_id: string | number, request: CreateQuestionFromCsvRequest) {
    const { is_replace, questions } = request
    return postFormApi<CreateQuestionFromCsvResponse>(
      `/question/create_questions_csv/${exam_id}`,
      { questions },
      { params: { is_replace } }
    )
  },

  updateQuestion(id: string | number, request: UpdateQuestionRequest) {
    return putApi(`/question/${id}`, request)
  },

  deleteQuestion(id: string | number) {
    return deleteApi(`/question/${id}`)
  },

  createAnswer(question_id: string | number, request: CreateAnswerRequest) {
    return postApi(`/question/answer/${question_id}`, request)
  },

  updateAnswer(answer_id: string | number, request: UpdateAnswerRequest) {
    return putApi(`/question/answer/${answer_id}`, request)
  },
  deleteAnswer(answer_id: string | number) {
    return deleteApi(`/question/answer/${answer_id}`)
  },
}
