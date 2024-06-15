import { Quiz } from '@/services/quiz'
import { create } from 'zustand'

type State = {
  quiz?: Quiz
}

type Actions = {
  setQuiz: (quiz?: Quiz) => void
}

export const useQuizStore = create<State & Actions>((set) => ({
  setQuiz: (quiz?: Quiz) => set({ quiz }),
}))
