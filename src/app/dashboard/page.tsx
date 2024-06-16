"use client";

import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { BoardList } from "./_components/board-list";

const DashboardPage = () => {
  const { user } = useUser()

  return (
    <div className="flex-1 h-[calc(100%-65px)] p-6">
      {!user ? "User not found" 
      :
        <BoardList
          authorId={user.id}
        />
      }

    </div>
  )
};

export default DashboardPage;
