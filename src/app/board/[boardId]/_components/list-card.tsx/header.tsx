

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

interface HeaderProps  {
  title: string;
  listId: string
}

export const Header = ({
  title,
  listId
}: HeaderProps) => {

  const { user } = useUser()
  const { mutate, pending } = useApiMutation(api.list.editListTitle)

  const [titleInput, setTitleInput] = useState(title)

  
  const editTitle = () => {
    if (!user) return;
    if (titleInput === title) return;
    mutate({
      listId: listId, 
      title: titleInput
    })
    .catch(() => toast.error("Unable to change board title"))
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
          >
            <Pencil className="mr-2 h-4 w-4" />
            <span>Rename</span>

          </DropdownMenuItem>

          <DropdownMenuSeparator />

          <DropdownMenuItem className="hover:cursor-pointer hover:bg-red-400 ">
            <Trash className="mr-2 h-4 w-4" />
            <span>Delete</span>
          </DropdownMenuItem>
  
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
};

