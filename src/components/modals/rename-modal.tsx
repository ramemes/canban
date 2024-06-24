"use client";

import { 
  AlertDialogAction, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialog, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogTitle, 
  AlertDialogTrigger  
} from "@/components/ui/alert-dialog";

import { useRenameModal } from "@/store/use-rename-model";

import { FormEventHandler, useEffect, useState } from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useApiMutation } from "@/hooks/useApiMutation";
import { api } from "../../../convex/_generated/api";
import { toast } from "sonner";

export const RenameModal = () => {
  const { 
    mutate, 
    pending 
  } = useApiMutation(api.board.editBoardTitle);

  const {
    isOpen,
    onClose,
    initialValues,
  } = useRenameModal();

  const [title, setTitle] = useState(initialValues.title);

  useEffect(() => {
    setTitle(initialValues.title);
  },[initialValues.title]);



  const editTitle: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()

    // if (initialValues.title === title) return;

    mutate({
      id: initialValues.id, 
      title
    })
    .then(() => {
      toast.success("Board renamed")
      onClose()
    })
    .catch(() => toast.error("Unable to change board title"))
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>

      <AlertDialogContent className="sm:max-w-[425px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Title</AlertDialogTitle>
          <AlertDialogDescription>
            Enter a new title for your board
          </AlertDialogDescription>
        </AlertDialogHeader>
        <form onSubmit={editTitle} className="space-y-4">
          <Input
              autoFocus
              disabled={pending}
              required
              maxLength={60}
              id="name"
              placeholder="Board title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

          <AlertDialogFooter>
              <Button disabled={pending} type="submit">Save changes</Button>
          </AlertDialogFooter>
        </form>

      </AlertDialogContent>
    </AlertDialog>
  )
}