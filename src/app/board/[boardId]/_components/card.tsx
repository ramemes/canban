import { CardModal } from "@/components/modals/card-modal";
import { 
  DropdownMenuShortcut, 
  DropdownMenuSub, 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuGroup, 
  DropdownMenuItem,
  DropdownMenuLabel, 
  DropdownMenuPortal, 
  DropdownMenuSeparator, 
  DropdownMenuSubContent, 
  DropdownMenuSubTrigger, 
  DropdownMenuTrigger  
} from "@/components/ui/dropdown-menu";
import { RenameInput } from "@/components/ui/rename-input";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useCardModal } from "@/store/use-card-modal";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { api } from "../../../../../convex/_generated/api";
import { Button } from "@/components/ui/button";
import { Draggable } from "@hello-pangea/dnd";

interface CardProps {
  id: string;
  title: string;
  description: string;
  color: string;
  index: number;
}


export const Card = ({
  id,
  title,
  description,
  color,
  index
}: CardProps) => {

  const [editing, setEditing] = useState(false)

  const {
    onOpen
  } = useCardModal();

  const { mutate, pending} = useApiMutation(api.card.deleteCard)

  const deleteCard = (e: React.MouseEvent) => {
    e.stopPropagation()
    mutate({
      id
    })
  }

  return (
    <Draggable draggableId={id} index={index}>
      {(provided) => (
        <div 
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          onClick={(e) => onOpen(id, title, description)}
          className="flex justify-between items-center my-2 rounded-md bg-slate-600 text-white pl-3 p-2 text-[14px] cursor-pointer hover:outline-1 hover:outline-slate-400 hover:outline min-h-12"
        >
          <div className="flex flex-col">
            <div 
              className="w-10 h-2 rounded-sm my-1"
              style={{backgroundColor:`#${color}`}}
            />
              <div className="break-words w-60">
                {title}
              </div>
          </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center justify-center min-w-6 p-1 ml-1 rounded-md hover:cursor-pointer hover:bg-gray-400 hover:bg-opacity-50 transition duration-200" asChild>
            <Pencil 
              onClick={(e) => (e.stopPropagation(), setEditing(true))}
              className="w-8 h-8 pl-2 pr-2 hover:bg-gray-700 hover:rounded-full rounded-full transition duration-200"
            />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
              <Button
                onClick={deleteCard}
                variant="ghost"
                className="p-3 cursor-pointer text-sm w-full justify-start font-normal" 
              >
                <Trash className="h-4 w-4 mr-2"/>
                Delete
              </Button>
          </DropdownMenuContent>
        </DropdownMenu>
        </div>
      )}

    </Draggable>
  )
};

