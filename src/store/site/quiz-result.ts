import { Quiz } from '@/services/quiz'
import { create } from 'zustand'

export type QuestionsInfo = Record<string, { questionType: string; correctAnswers: number[] }>

type State = {
  quiz?: Quiz
  questionsInfo?: QuestionsInfo
  backForExit?: boolean
}

type Actions = {
  setQuiz: (quiz?: Quiz) => void
  setQuestionsInfo: (questionsInfo?: QuestionsInfo) => void
  setBackForExit: (backForExit: boolean) => void
}

export const useQuizResultStore = create<State & Actions>((set) => ({
  setQuiz: (quiz?: Quiz) => {
    const questionsInfo = (() => {
      if (!quiz) {
        return {}
      }

      return quiz.questions_log.reduce<QuestionsInfo>((acc, question) => {
        const questionId = question.question_id
        const questionType = question.type
        const correctAnswers = question.correct_answer || []

        return {
          ...acc,
          [questionId]: {
            questionType,
            correctAnswers,
          },
        }
      }, {})
    })()

    set({
      quiz,
      questionsInfo,
    })
  },
  setQuestionsInfo: (questionsInfo?: QuestionsInfo) => set({ questionsInfo }),
  setBackForExit: (backForExit) => set({ backForExit }),
}))
