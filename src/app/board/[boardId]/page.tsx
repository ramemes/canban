"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";
import { BoardNav } from "./_components/board-nav";
import { ListList } from "./_components/list-list";
import { Loading } from "@/components/auth/loading";
import { Protect } from "@clerk/nextjs";

interface BoardIdPageProps {
  params: {
    boardId: string;
  }
}

const BoardIdPage = ({
  params,
}: BoardIdPageProps) => {

  const board = useQuery(api.board.getBoardListsCards, {
    boardId: params.boardId as Id<"boards">,
  });

  if (!board) return (
    <Loading/>
  );

  return (
    <div className="z-[1] flex w-full flex-col overflow-x-hidden bg-gradient-to-b from-purple-700 to-fuchsia-700">
      <BoardNav
        boardId={board._id}
        title={board.title}
      />
      <ListList 
        boardId={board._id}
        listsCards={board.lists}
      />
    </div>
  )
};

export default BoardIdPage;
