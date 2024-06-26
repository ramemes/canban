

import { DropdownMenuShortcut, DropdownMenuSub, DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuPortal, DropdownMenuSeparator, DropdownMenuSubContent, DropdownMenuSubTrigger, DropdownMenuTrigger  } from "@/components/ui/dropdown-menu";
import { useUser } from "@clerk/nextjs";
import {  Ellipsis,MoreHorizontal,Pencil, Trash} from "lucide-react";
import { Inter, Poppins } from "next/font/google";
import { useState } from "react";
import { useApiMutation } from "../../../../../hooks/useApiMutation";
import { api } from "../../../../../../convex/_generated/api";
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
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useRenameModal } from "@/store/use-rename-modal";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import { RenameInput } from "@/components/ui/rename-input";

interface HeaderProps  {
  title: string;
  listId: string
}

export const Header = ({
  title,
  listId
}: HeaderProps) => {

  const { onOpen } = useRenameModal();
  const { mutate: deleteList, pending: deleteListPending } = useApiMutation(api.list.deleteList)
  const { mutate: renameList, pending: renameListPending } = useApiMutation(api.list.editListTitle)


  // const [titleEditing, setTitleEditing] = useState(false)
  // const [titleValue, setTitleValue] = useState(title)

  // const changeTitle = () => {
  //   renameList({
  //     id: listId,
  //     title: titleValue
  //   })
  //   .catch(() => toast.error("Failed to rename list"))
  //   .finally(() => setTitleEditing(false))
  // }
  
  const onDelete = () => {
    deleteList({
      id: listId,
    })
    .then(() => {
      toast.success("List deleted");
    })
    .catch(() => toast.error("Failed to delete list"))
  }

  return (
    <div className="flex items-center justify-between gap-x-1 text-white font-sans p-1"> 

      <RenameInput
        id={listId}
        title={title}
        renameFunction={renameList}
        dataType="list"
        className="w-fit  text-white font-sans "
      />


      <DropdownMenu>
        <DropdownMenuTrigger className="flex items-center justify-center min-w-6 p-1 ml-1 rounded-md hover:cursor-pointer hover:bg-gray-400 hover:bg-opacity-50 transition duration-200" asChild>
          <Ellipsis/>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">


          <ConfirmModal
            header="Delete board?"
            description="This will delete the board and all of its contents."
            disabled={deleteListPending}
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

