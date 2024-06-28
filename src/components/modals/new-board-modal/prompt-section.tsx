import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { useApiMutation } from "@/hooks/useApiMutation";
import { useCardModal } from "@/store/use-card-modal";
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useNewBoardModal } from "@/store/use-new-board-modal";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { imgFromPublic } from "../../../../utils/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

// interface NewBoardPromptModalProps {
//   setAddingPrompt: (x: boolean) => void;
// }

export const PromptSection = () => {
  const router = useRouter()

  const {
    onOpen,
    id,
    prompt,
    updatePrompt,
    setAddingPrompt
  } = useNewBoardModal()
  
  const { mutate, pending } = useApiMutation(api.board.createBoard)


  // const createBoard = () => {
  //   const randomImage = imgFromPublic()
    
  //   mutate({
  //     authorId: id,
  //     title,
  //     imageUrl: randomImage
  //   })
  //   .then((board) => {
  //     toast.success("Board created");
  //     router.push(`/board/${board}`)
  //     onClose()
  //   })
  //   .catch(() => toast.error("Failed to create board"))
  // }

  // const goBack = () => {
  //   onOpenBoardModal(id)
  // }

  

  return (
      <>
        <ChevronLeft 
          className="h-9 w-9 absolute left-4 top-4 p-2 text-muted-foreground cursor-pointer hover:text-white hover:bg-gray-700 rounded-sm"
          onClick={() => setAddingPrompt(false)}
        />
  
        <DialogHeader className="flex flex-row items-center justify-center">
          <DialogTitle>Create board</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-6">
          <div className="flex flex-col gap-y-4">
            <Label htmlFor="name" className="pl-1">
            Enter your prompt
            </Label>
            <Textarea
              id="title"
              defaultValue={prompt}
              value={prompt}
              onChange={(e) => updatePrompt(e.target.value)}
              // onKeyDown={(e) => e.key === "Enter" ? createBoard() : null}
              className=""
            />
          </div>
        </div>

        <DialogFooter>
          <div
            className="w-full flex flex-col items-center justify-center gap-y-2"
          >
            <Button 
              disabled={pending || prompt.length < 5}
              type="submit"
              onClick={() => {}}
              className="card-wrapper text-white w-full "
            >
              <div className="card-content flex items-center justify-center w-full ">
                Create
              </div>                        
            </Button>
          </div>
          
        </DialogFooter>
    </>
  )
};

