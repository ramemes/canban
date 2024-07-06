"use client";


import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import axios from "axios";

import { useApiMutation } from "@/hooks/useApiMutation";

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
import { ChatCompletionMessageParam } from "openai/resources/index.mjs";
import { useState } from "react";
import { useOrganization } from "@clerk/nextjs";

// interface NewBoardPromptModalProps {
//   setAddingPrompt: (x: boolean) => void;
// }

export const PromptSection = () => {
  const router = useRouter()

  const {
    onOpen,
    onClose,
    id,
    title,
    prompt,
    updatePrompt,
    setAddingPrompt
  } = useNewBoardModal()

  const { organization } = useOrganization();
  
  const { mutate, pending } = useApiMutation(api.board.createBoard)
  const [apiPending, setApiPending] = useState(false)

  const createBoard = async () => {
    if (!organization) return;
    try {
      setApiPending(true)
      const randomImage = imgFromPublic()
      const userMessage: ChatCompletionMessageParam = {
        role: "user",
        content: prompt
      };
      const response = await axios.post("/api/board", {
        messages: [userMessage],
      });
      // console.log(response.data.content)
      mutate({
        orgId: organization.id,
        title,
        response: response.data.content,
      })
      .then((board) => {
        toast.success("Board created");
        router.push(`/board/${board}`)
        onClose()
      })
      .catch(() => toast.error("Failed to create board"))

    } catch (error: any) {
      console.log(error)
    } finally {
      setApiPending(false)
    }
  }



  

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
              // defaultValue={prompt}
              placeholder="Give me a development plan for making a Kanban board application."
              value={prompt}
              onChange={(e) => updatePrompt(e.target.value)}
              // onKeyDown={(e) => e.key === "Enter" ? createBoard() : null}
              className=" placeholder:text-gray-500 placeholder:text-opacity-90"
            />
          </div>
        </div>

        <DialogFooter>
          <div
            className="w-full flex flex-col items-center justify-center gap-y-2"
          >
            <Button 
              disabled={pending || prompt.length < 5 || apiPending}
              type="submit"
              onClick={() => {}}
              className="card-wrapper text-white w-full "
            >
              <div 
                className="card-content flex items-center justify-center w-full "
                onClick={createBoard}
              >
                Create
              </div>                        
            </Button>
          </div>
          
        </DialogFooter>
    </>
  )
};

