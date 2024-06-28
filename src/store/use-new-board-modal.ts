import { create } from "zustand";
// const defaultValues = { id: "", title: "" };

interface INewBoardModal {
  id: string;
  title: string;
  isOpen: boolean;
  prompt: string;
  addingPrompt: boolean;
  setAddingPrompt: (e: any) => void;
  onOpen: (id: string) => void;
  onClose: () => void;
  updateTitle: (e: any) => void; 
  updatePrompt: (e: any) => void; 
};

// interface INewBoardPromptModal {
//   // id: string;
//   // title: string;
//   prompt: string;
//   // isOpen: boolean;
//   // onOpen: (prompt: string) => void;
//   // onClose: () => void;
//   updatePrompt: (e: any) => void; 
// };

export const useNewBoardModal = create<INewBoardModal>((set) => ({
  id: "",
  title: "",
  prompt: "",
  isOpen: false,
  addingPrompt: false,
  onOpen: (id) => set({
    isOpen: true,
    id, 
    title: "",
    prompt: "" 
  }),
  onClose: () => set({
    isOpen: false,
    addingPrompt: false
  }),
  updateTitle: (title) => set(() => ({
    title
  })),
  updatePrompt: (prompt) => set(() => ({
    prompt
  })),
  setAddingPrompt: (x) => set(() => ({
    addingPrompt: x
  })),

}))

//if want to separate perhaps try prompt and updatePrompt in separate context
// keeping addingPrompt in modal context as that is just for tracking modal state


// export const usePromptSection = create<INewBoardPromptModal>((set) => ({
//   prompt: "",
//   // isOpen: false,
//   // onOpen: (prompt) => set({
//   //   isOpen: true,
//   //   prompt 
//   // }),
//   // onClose: () => set({
//   //   isOpen: false,
//   // }),
//   updatePrompt: (prompt) => set(() => ({
//     prompt
//   }))
// }))