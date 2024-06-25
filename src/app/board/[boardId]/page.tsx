"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { Loader } from "lucide-react";
import { BoardNav } from "./_components/board-nav";
import { ListList } from "./_components/list-list";

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
    <div className="z-[1] flex w-full flex-col overflow-x-hidden bg-gradient-to-b from-purple-700 to-fuchsia-700">

      <BoardNav
        boardId={board._id}
        title={board.title}
      />
      <ListList boardId={board._id}/>
    </div>


  )
};

export default BoardIdPage;
