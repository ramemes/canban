import { useQuery } from "convex/react";
import { ListCard } from "./list-card.tsx/index.tsx";
import { api } from "../../../../../convex/_generated/api.js";
import { Id } from "../../../../../convex/_generated/dataModel.js";
import { NewListButton } from "./new-list-button.tsx";

interface ListListProps {
  boardId: string
}

export const ListList = ({
  boardId
}: ListListProps) => {


  const lists = useQuery(api.lists.getLists, {
    boardId: boardId as Id<"boards">,
  })


  return (
    <div className="flex flex-row p-8 gap-x-4 h-full overflow-x-auto z-[1]">
        {lists?.map((list) => (
          <ListCard 
            key={list._id}
            listId={list._id}
            title={list.title}
            color={list.color}
            creationTime={list._creationTime}
          />
        ))
        }
        <NewListButton
          boardId={boardId}
        />
    </div>
  )
};

