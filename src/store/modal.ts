import { Course } from '@/services/courses'
import { useCallback } from 'react'
import { NonUndefined } from 'react-hook-form'
import { create } from 'zustand'

export enum Modals {
  LOGOUT = 'LOGOUT',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_COURSE = 'DELETE_COURSE',
}

type ModalState<T = undefined> = {
  open: boolean
  data?: T | undefined
  zIndex?: number
}

type State = {
  modal: {
    [Modals.LOGOUT]?: ModalState
    [Modals.DELETE_COURSE]?: ModalState<{ course: Course }>
  }
}

type ModaType = keyof State['modal']
type ModalOriginData<T extends ModaType> = NonUndefined<State['modal'][T]>['data']
type ModalData<T extends ModaType> = NonUndefined<ModalOriginData<T>> extends undefined
  ? any
  : NonUndefined<ModalOriginData<T>>

type Actions = {
  openModal: <T extends ModaType>(modal: T, data: ModalData<T>, zIndex?: number) => void
  closeModal: (modal: Modals) => void
  closeAllModals: () => void
}

const initialState: State = {
  modal: {},
}

export const useModalStore = create<State & Actions>((set) => ({
  modal: initialState.modal,
  openModal: (modal, data, zIndex) => {
    console.log({ modal, data, zIndex })
    set((state) => {
      return {
        modal: {
          ...state.modal,
          [modal]: {
            open: true,
            data: data,
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

export const useOpenModal = <T extends ModaType>(modal: T) => {
  const openModal = useModalStore((state) => state.openModal)
  return useCallback(
    (data: ModalData<T>, zIndex?: number) => {
      openModal(modal, data, zIndex)
    },
    [modal, openModal]
  )
}

export const useCloseModal = (modal: Modals) => {
  const closeModal = useModalStore((state) => state.closeModal)
  return useCallback(
    (open: boolean) => {
      if (!open) {
        closeModal(modal)
      }
    },
    [closeModal, modal]
  )
}
