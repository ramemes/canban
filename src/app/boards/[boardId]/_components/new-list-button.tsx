import { Button } from "@/components/ui/button";
import { useApiMutation } from "../../../../../hooks/useApiMutation";
import { api } from "../../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { NewListForm } from "./new-list-form";

interface NewListButtonProps {
  boardId: string;
  // listsLength: number;
}

export const NewListButton = ({
  boardId,
  // listsLength
}: NewListButtonProps) => {

  const [addingList, setAddingList] = useState(false);



  return (
    <div>
      {
        addingList ? 
          <NewListForm 
            boardId={boardId}
            setAddingList={setAddingList}
            // listsLength={listsLength}
          />
        :
          <Button 
          onClick={() => setAddingList(!addingList)}
          className="w-64 h-fit p-3 rounded-lg bg-gray-400 hover:bg-opacity-70" 
          variant="list"
          >
            + Add another list
          </Button>
      }
    </div>

  )
};

