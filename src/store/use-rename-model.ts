import { create } from "zustand";

const defaultValues = { id: "", title: "", table: "" };

interface IRenameModal {
  isOpen: boolean;
  initialValues: typeof defaultValues;
  onOpen: (id: string, title: string, table: string) => void;
  onClose: () => void;
};

export const useRenameModal = create<IRenameModal>((set) => ({
  isOpen: false,
  onOpen: (id, title, table) => set({
    isOpen: true,
    initialValues: { id, title, table },
  }),
  onClose: () => set({
    isOpen: false,
    initialValues: defaultValues,
  }),
  initialValues: defaultValues,
}))