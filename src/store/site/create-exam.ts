import { Topic } from '@/services/topics'
import { create } from 'zustand'

type State = {
  topic?: Topic
}

type Actions = {
  setTopic: (topic?: Topic) => void
}

export const useCreateExamStore = create<State & Actions>((set) => ({
  setTopic: (topic) => set({ topic }),
}))
