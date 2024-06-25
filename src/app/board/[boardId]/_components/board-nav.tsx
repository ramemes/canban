import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApiMutation } from "../../../../hooks/useApiMutation";
import { api } from "../../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";
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
import { useRenameModal } from "@/store/use-rename-modal";
 
interface BoardNavProps {
  title: string;
  boardId: string
}

export const BoardNav = ({
  title,
  boardId
}: BoardNavProps) => {
  const { user } = useUser()
  // const { mutate, pending } = useApiMutation(api.board.editBoardTitle)

  const {
    isOpen,
    onClose,
    onOpen,
    initialValues,
  } = useRenameModal();


  return (

    <div 
      className="flex items-center text-white pl-4 h-20 z-[0] text-xl bg-black bg-opacity-30"
      
    >
      <div 
        onClick={() => onOpen(boardId, title)}
        className="w-fit p-2 hover:bg-gray-400 hover:bg-opacity-40 hover:cursor-pointer rounded-md  font-semibold text-2xl"
      >
        {title}
      </div>
    </div>

  )
};

