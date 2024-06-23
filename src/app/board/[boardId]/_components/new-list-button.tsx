import { Button } from "@/components/ui/button";
import { useApiMutation } from "../../../../../hooks/useApiMutation";
import { api } from "../../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { NewListForm } from "./new-list-form";
import { Plus } from "lucide-react";

interface NewListButtonProps {
  boardId: string;
}

export const NewListButton = ({
  boardId,
}: NewListButtonProps) => {

  const [addingList, setAddingList] = useState(false);



  return (
    <div>
      {
        addingList ? 
          <NewListForm 
            boardId={boardId}
            setAddingList={setAddingList}
          />
        :
          <Button 
            onClick={() => setAddingList(!addingList)}
            className="w-80 h-fit p-3 rounded-lg bg-gray-800 bg-opacity-90 hover:bg-opacity-60" 
            variant="list"
          >
            <Plus className="mx-1 w-5"/> Add another list
          </Button>
      }
    </div>

  )
};

