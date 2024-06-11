import { User } from '@/services/auth'
import { create } from 'zustand'

type State = {
  user?: User
  isCheckedAuth: boolean
}

type Actions = {
  setUser: (user: User | undefined) => void
  setIsCheckedAuth: (isCheckedAuth: boolean) => void
}

export const useUserStore = create<State & Actions>((set) => ({
  user: undefined,
  isCheckedAuth: false,
  setUser: (user) => set({ user }),
  setIsCheckedAuth: (isCheckedAuth) => set({ isCheckedAuth }),
}))
