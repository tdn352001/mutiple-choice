import { Exam } from '@/services/exams'
import { create } from 'zustand'

export enum ExamViewMode {
  DEFAULT = 'DEFAULT',
  EDIT = 'EDIT',
  STATS = 'STATS',
}

type State = {
  viewMode: ExamViewMode
  exam?: Exam
}

type Actions = {
  setExam: (exam?: Exam) => void
  setViewMode: (mode: ExamViewMode) => void
}

export const useExamDetailStore = create<State & Actions>((set) => ({
  viewMode: ExamViewMode.DEFAULT,
  setExam: (exam?: Exam) => set({ exam }),
  setViewMode: (viewMode) => set({ viewMode }),
}))
