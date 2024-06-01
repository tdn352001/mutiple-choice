import { Course } from '@/services/courses'
import { create } from 'zustand'

type State = {
  course?: Course
}

type Actions = {
  setCourse: (course?: Course) => void
}

export const useCreateTopicStore = create<State & Actions>((set) => ({
  setCourse: (course) => set({ course }),
}))
