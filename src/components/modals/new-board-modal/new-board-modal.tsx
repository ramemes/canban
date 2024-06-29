import {
  Dialog,
  DialogContent,

} from "@/components/ui/dialog"


import { useNewBoardModal } from "@/store/use-new-board-modal";

import { useRouter } from "next/navigation";
import { PromptSection } from "./prompt-section";
import { CreateSection } from "./create-section";
import { useState } from "react";


export const NewBoardModal = () => {
  const router = useRouter()

  const {
    isOpen,
    onClose,
    addingPrompt
  } = useNewBoardModal()


  return (
    <Dialog  open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-[425px]" aria-describedby="create board modal">          
        {addingPrompt ?
          <PromptSection/>
          :
          <CreateSection/>
        }
      </DialogContent>
    </Dialog>

  )
};

