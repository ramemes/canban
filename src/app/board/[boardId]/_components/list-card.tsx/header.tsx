

import { DropdownMenuShortcut, DropdownMenuSub, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger  } from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import {  Ellipsis,Pencil, Trash} from "lucide-react";
import { Inter, Poppins } from "next/font/google";
import { useState } from "react";
import { useApiMutation } from "../../../../../hooks/useApiMutation";
import { api } from "../../../../../../convex/_generated/api";
import { toast } from "sonner";
import { AlertDialogAction, AlertDialogFooter, AlertDialogHeader, AlertDialog, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger  } from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-model";
import { ConfirmModal } from "@/components/ui/confirm-modal";

interface HeaderProps  {
  title: string;
  listId: string
}

export const Header = ({
  title,
  listId
}: HeaderProps) => {

  
  const { onOpen } = useRenameModal();
  const { mutate, pending } = useApiMutation(api.list.deleteList)

  
  
  const onDelete = () => {
    mutate({
      id: listId,
    })
    .then(() => {
      toast.success("List deleted");
    })
    .catch(() => toast.error("Failed to delete list"))
  }

  return (
    <div className="flex justify-between text-white font-sans p-1">
      {title}

      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center p-1 rounded-md hover:cursor-pointer hover:bg-gray-400 hover:bg-opacity-50 transition duration-200" asChild>
          <Ellipsis/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuItem 
            className="hover:cursor-pointer hover:bg-gray-400"
            onClick={() => onOpen(listId, title, "lists")} 
          >
            <Pencil className="mr-2 h-4 w-4" />
            <span>Rename</span>

          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <ConfirmModal
            header="Delete board?"
            description="This will delete the board and all of its contents."
            disabled={pending}
            onConfirm={onDelete}
          >
            <Button
              variant="ghost"
              className="p-3 cursor-pointer text-sm w-full justify-start font-normal" 
            >
              <Trash className="h-4 w-4 mr-2"/>
              Delete
            </Button>
          </ConfirmModal>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
};

