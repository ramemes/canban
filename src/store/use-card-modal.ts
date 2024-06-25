import { create } from "zustand";

const defaultValues = { id: "", title: "", description: ""};

interface IRenameModal {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (id: string, title: string, description: string) => void;
  onClose: () => void;
};

export const useCardModal = create<IRenameModal>((set) => ({
  isOpen: false,
  initialValues: defaultValues,
  onOpen: (id, title, description ) => set({
    isOpen: true,
    initialValues: { id, title, description },
  }),
  onClose: () => set({
    isOpen: false,
    initialValues: defaultValues,
  }),
}))