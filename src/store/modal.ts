import { Course } from '@/services/courses'
import { create } from 'zustand'

enum Modals {
  LOGOUT = 'LOGOUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_COURSE = 'DELETE_COURSE',
}

type ModalState<T = any> = {
  show: boolean
  data?: T
  zIndex?: number
}

type State = {
  modal: {
    [Modals.LOGOUT]?: ModalState
    [Modals.DELETE_COURSE]?: ModalState<{ course: Course }>
  }
}

type ModaType = keyof State['modal']
type ModalData<T extends ModaType> = State['modal'][T] extends object ? State['modal'][T]['data'] : undefined

type Actions = {
  openModal: <T extends ModaType>(modal: ModaType, data: ModalData<T>) => void
  closeModal: (modal: Modals) => void
  closeAllModals: () => void
}

const initialState: State = {
  modal: {},
}

export const useModalStore = create<State & Actions>((set) => ({
  modal: initialState.modal,
  openModal: <T extends ModaType>(modal: T, data?: State['modal'][T], zIndex?: number) => {
    set((state) => {
      return {
        modal: {
          ...state.modal,
          [modal]: {
            show: true,
            data,
            zIndex: zIndex,
          },
        },
      }
    })
  },
  closeModal: (modal) => {
    set((state) => {
      return {
        modal: {
          ...state.modal,
          [modal]: {
            show: false,
          },
        },
      }
    })
  },
  closeAllModals: () => {
    set(initialState)
  },
}))
