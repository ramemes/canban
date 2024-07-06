"use client";

import { DropdownMenuContentProps } from "@radix-ui/react-dropdown-menu";


import { 
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Pencil, Trash } from "lucide-react";
import { toast } from "sonner";



import { api } from "../../../../../../convex/_generated/api";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useRenameModal } from "@/store/use-rename-modal";
import { ConfirmModal } from "../../../../../components/modals/confirm-modal";
import { Button } from "../../../../../components/ui/button";



interface ActionsProps {
  children: React.ReactNode;
  side?: DropdownMenuContentProps["side"];
  sideOffset?: DropdownMenuContentProps["sideOffset"];
  id: string;
  title: string;
  tableType: string;
}

export const BoardCardActions = ({
  children,
  side,
  sideOffset,
  id,
  title,
}: ActionsProps) =>  {

  const { onOpen } = useRenameModal();

  const { 
    mutate, 
    pending 
  } = useApiMutation(api.board.deleteBoard) 



  const onDelete = () => {
    mutate({
      id: id,
    })
    .then(() => {
      toast.success(`Board deleted`);
    })
    .catch(() => toast.error(`Failed to delete board`))
  }



  return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {children}
        </DropdownMenuTrigger>
        <DropdownMenuContent 
          onClick={(e) => e.stopPropagation()}
          className="w-56 z-[7]"
          side={side}
        >

          <DropdownMenuItem 
            onClick={() => onOpen(id, title)}
            className="cursor-pointer hover:bg-gray-400 p-2" 
          >
            <Pencil className="mr-2 h-4 w-4" />
            <span>Rename</span>
          </DropdownMenuItem>

          <DropdownMenuSeparator />

          
          <ConfirmModal
            header={`Delete board?`}
            description={`This will delete the board and all of its contents.`}
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
  )
}




