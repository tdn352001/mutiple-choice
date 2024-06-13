import { Course } from '@/services/courses'
import { Exam } from '@/services/exams'
import { ExamImage } from '@/services/images'
import { Question } from '@/services/questions'
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
  DELETE_EXAM = 'DELETE_EXAM',
  DELETE_QUESTION = 'DELETE_QUESTION',
  ADD_QUESTION = 'ADD_QUESTION',
  EDIT_QUESTION = 'EDIT_QUESTION',
  VIEW_QUESTION = 'VIEW_QUESTION',
  PREVIEW_IMAGE = 'PREVIEW_IMAGE',
  DELETE_IMAGE = 'DELETE_IMAGE',
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
    [Modals.DELETE_EXAM]?: ModalState<{ exam: Exam; topicId?: string | number }>
    [Modals.DELETE_QUESTION]?: ModalState<{ question: Question; examId?: string | number }>
    [Modals.ADD_QUESTION]?: ModalState<{ examId: string | number; type: 'manually' | 'file' }>
    [Modals.EDIT_QUESTION]?: ModalState<{ question: Question }>
    [Modals.VIEW_QUESTION]?: ModalState<{ question: Question }>
    [Modals.PREVIEW_IMAGE]?: ModalState<{ imageUrl: string }>
    [Modals.DELETE_IMAGE]?: ModalState<{ image: ExamImage }>
  }
}

type ModaType = keyof State['modal']
type ModalOriginData<T extends ModaType> = NonUndefined<State['modal'][T]>['data']
type ModalData<T extends ModaType> = NonUndefined<ModalOriginData<T>> extends undefined
  ? never
  : NonUndefined<ModalOriginData<T>>

type Actions = {
  openModal: <T extends ModaType>(modal: T, data?: ModalData<T>, zIndex?: number) => void
  closeModal: <T extends ModaType>(modal: T) => void
  closeAllModals: () => void
  updateModalData: <T extends ModaType>(modal: T, data: ModalData<T>) => void
}

const initialState: State = {
  modal: {},
}

export const useModalStore = create<State & Actions>((set) => ({
  modal: initialState.modal,
  openModal: (modal, data, zIndex) => {
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
            ...state.modal[modal],
            open: false,
          },
        },
      }
    })
  },
  closeAllModals: () => {
    set(initialState)
  },
  updateModalData: (modal, data) => {
    set((state) => {
      return {
        modal: {
          ...state.modal,
          [modal]: {
            ...state.modal[modal],
            data: data,
          },
        },
      }
    })
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

// TODO: This hook has not been tested yet
export const useUpdateModalData = <T extends ModaType>(modal: T) => {
  const updateModalData = useModalStore((state) => state.updateModalData)
  return useCallback(
    (data: ModalData<T>) => {
      updateModalData(modal, data)
    },
    [modal, updateModalData]
  )
}

export const useCloseModal = <T extends ModaType>(modal: T) => {
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
