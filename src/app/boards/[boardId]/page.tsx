"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Loader } from "lucide-react";
import { ListCard } from "./_components/list-card.tsx";

interface BoardIdPageProps {
  params: {
    boardId: string;
  }
}


const BoardIdPage = ({
  params,
}: BoardIdPageProps) => {

  const board = useQuery(api.board.get, {
    boardId: params.boardId as Id<"boards">,
  });

  const lists = useQuery(api.lists.getLists, {
    boardId: params.boardId as Id<"boards">,
  })

  if (!board) {
    return (
      <main
      className="h-full w-full relative touch-none flex items-center justify-center"
      >
        <Loader className="h-6 w-6 text-muted-foreground animate-spin"/>
      </main>
    )
  
  }

  return (
    <div className="flex w-full flex-col bg-blue-200">
      <div className="bg-purple-300">{board.title}</div>
      <div className="flex flex-row p-8 gap-x-8">
        {
          lists 
            ? lists.map((list) => (
              <ListCard 
                key={list._id}
                listId={list._id}
                title={list.title}
                color={list.color}
                creationTime={list._creationTime}
              />
              ))
            : <div> Loading Lists</div>
        }
      </div>
    </div>


  )
};

export default BoardIdPage;
