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
import { useState } from "react";
import { api } from "../../../../convex/_generated/api";
import { useNewBoardModal } from "@/store/use-new-board-modal";
import { Input } from "../../ui/input";
import { Button } from "../../ui/button";
import { Label } from "../../ui/label";
import { imgFromPublic } from "../../../../utils/utils";
import { toast } from "sonner";
import { useRouter } from "next/navigation";


// interface CreateSectionProps {
//   setAddingPrompt: (x: boolean) => void;
// }

export const CreateSection = () => {
  
  const router = useRouter()

  const {
    onClose,
    updateTitle,
    id,
    title,
    setAddingPrompt
  } = useNewBoardModal()

  const { mutate, pending } = useApiMutation(api.board.createBoard)

  const createBoard = () => {
    const randomImage = imgFromPublic()
    
    mutate({
      authorId: id,
      title,
      imageUrl: randomImage
    })
    .then((board) => {
      toast.success("Board created");
      router.push(`/board/${board}`)
      onClose()
    })
    .catch(() => toast.error("Failed to create board"))
  }



  return (
    <>          
      <DialogHeader className="flex flex-row items-center justify-center">
      <DialogTitle>Create board</DialogTitle>
      </DialogHeader>
      <div className="grid gap-4 py-6">
        <div className="flex flex-col gap-y-4">
          <Label htmlFor="name" className="pl-1">
          Board title
          </Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => updateTitle(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" ? createBoard() : null}
          />
        </div>
      </div>

      <DialogFooter>
        <div
          className="w-full flex flex-col items-center justify-center gap-y-2"
        >
          <Button 
            disabled={pending || title.length < 1}
            type="submit"
            className="w-full"
            onClick={createBoard}
          >
            Create
          </Button>

          <Button 
            disabled={pending || title.length < 1}
            type="submit"
            onClick={() => setAddingPrompt(true)}
            className="card-wrapper text-white w-full"
          >
            <div className="card-content flex items-center justify-center w-full ">
              Create from AI prompt
            </div>                        
          </Button>
        </div>
      </DialogFooter>
    </>

  )
};

