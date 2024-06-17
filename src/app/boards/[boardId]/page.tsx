"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { Id } from "../../../../convex/_generated/dataModel";

interface BoardIdPageProps {
  params: {
    boardId: string;
  }
}


const BoardIdPage = ({
  params,
}: BoardIdPageProps) => {

  const board = useQuery(api.board.getBoard, {
    boardId: params.boardId as Id<"boards">,
  });

  return (
    <div>
      {board?.title}
    </div>
  )
};

export default BoardIdPage;
