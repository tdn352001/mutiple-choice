import { Course } from '@/services/courses'
import { Topic } from '@/services/topics'
import { useCallback } from 'react'
import { NonUndefined } from 'react-hook-form'
import { create } from 'zustand'

export enum Modals {
  LOGOUT = 'LOGOUT',
  CHANGE_PASSWORD = 'CHANGE_PASSWORD',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
  DELETE_COURSE = 'DELETE_COURSE',
  DELETE_TOPIC = 'DELETE_TOPIC',
}

type ModalState<T = undefined> = {
  open: boolean
  data?: T | undefined
  zIndex?: number
}

type State = {
  modal: {
    [Modals.LOGOUT]?: ModalState
    [Modals.CHANGE_PASSWORD]?: ModalState
    [Modals.DELETE_COURSE]?: ModalState<{ course: Course }>
    [Modals.DELETE_TOPIC]?: ModalState<{ topic: Topic; courseId?: string | number }>
  }
}

type ModaType = keyof State['modal']
type ModalOriginData<T extends ModaType> = NonUndefined<State['modal'][T]>['data']
type ModalData<T extends ModaType> = NonUndefined<ModalOriginData<T>> extends undefined
  ? never
  : NonUndefined<ModalOriginData<T>>

type Actions = {
  openModal: <T extends ModaType>(modal: T, data?: ModalData<T>, zIndex?: number) => void
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
    (data?: ModalData<T>, zIndex?: number) => {
      openModal(modal, data, zIndex)
    },
    [modal, openModal]
  )
}

export const useIsModalOpen = <T extends ModaType>(modal: T) => {
  return useModalStore((state) => state.modal[modal]?.open)
}

export const useModalData = <T extends ModaType>(modal: T) => {
  return useModalStore((state) => state.modal[modal]?.data) as ModalData<T>
}

export const useCloseModal = (modal: Modals) => {
  const closeModal = useModalStore((state) => state.closeModal)
  return useCallback(() => {
    closeModal(modal)
  }, [closeModal, modal])
}

export const getModalData = <T extends ModaType>(modal: T) => {
  return useModalStore.getState().modal[modal]?.data as ModalData<T>
}

export const useModalState = <T extends ModaType>(modal: T) => {
  const open = useIsModalOpen(modal)
  const data = getModalData(modal) as ModalData<T> | undefined
  const closeModal = useCloseModal(modal)

  return { open, data, closeModal }
}
