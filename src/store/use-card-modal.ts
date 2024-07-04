import { create } from "zustand";


interface ICardModal {
  id: string; 
  title: string;
  description: string
  isOpen: boolean;
  onOpen: (id: string, title: string, description: string) => void;
  onClose: () => void;
  updateDescription: (e: any) => void; 
  updateTitle: (e: any) => void; 

};

export const useCardModal = create<ICardModal>((set) => ({
  isOpen: false,
  id: "", 
  title: "", 
  description: "",
  onOpen: (id, title, description) => set({
    isOpen: true,
    id: id, 
    title: title, 
    description: description
  }),
  onClose: () => set({
    isOpen: false,
  }),
  updateDescription: (description) => set(() => ({
    description
  })),
  updateTitle: (title) => set(() => ({
    title
  })),
}))
