"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";

interface BoardListProps {
  authorId: string;

}


export const BoardList = ({
  authorId,
}: BoardListProps) => {

  const data = useQuery(api.boards.getUserBoards, {
    authorId: authorId
  })
  

  if (data === undefined) {
    return null
    // return BoardCard.Skeleton
  }


  return (
    <div>
      <h2 className="text-2xl font-semibold">Your Boards</h2>
      {/* <NewBoardButton authorId={authorId}/> */}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10">
        <NewBoardButton authorId={authorId}/>
        {data.map((board) => (
          <BoardCard 
            key={board._id}
            id={board._id}
            title={board.title}
            image={board.imageUrl}
          />

        ))}
      </div>

    </div>
  )
};
