"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { BoardCard } from "./board-card";
import { NewBoardButton } from "./new-board-button";
import { EmptySearch } from "./empty-search";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
  };
}


export const BoardList = ({
  orgId,
  query
}: BoardListProps) => {

  const data = useQuery(api.boards.getUserBoards, {
    orgId: orgId,
    ...query
  })
  

  if (data === undefined) {
    return null
    // return BoardCard.Skeleton
  }

  if (!data?.length && query.search) {
    return (
      <EmptySearch/>
    )
  }
  
  // if (!data?.length) {
  //   return (
  //     <EmptyBoards/>
  //   )
  // }
  
  return (
    <div>
      <h2 className="text-2xl font-semibold">Your Boards</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
      xl:grid-cols-5 2xl:grid-cols-6 gap-5 mt-8 pb-10 ">
        <NewBoardButton orgId={orgId}/>
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
