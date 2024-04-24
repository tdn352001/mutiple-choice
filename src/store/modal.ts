import { create } from "zustand";

enum Modals {
  LOGOUT = "logoutModal",
  UPDATE_PASSWORD = "updatePasswordModal",
}

type State = {
  modal: Record<Modals, boolean>;
};

type Actions = {
  openModal: (modal: Modals) => void;
  closeModal: (modal: Modals) => void;
  closeAllModals: () => void;
};

const initialState: State = {
  modal: {
    [Modals.LOGOUT]: false,
    [Modals.UPDATE_PASSWORD]: false,
  },
};

export const useModalStore = create<State & Actions>((set) => ({
  modal: initialState.modal,
  openModal: (modal) =>
    set((state) => ({ modal: { ...state.modal, [modal]: true } })),
  closeModal: (modal) =>
    set((state) => ({ modal: { ...state.modal, [modal]: false } })),
  closeAllModals: () => {
    set({
      modal: initialState.modal,
    });
  },
}));
