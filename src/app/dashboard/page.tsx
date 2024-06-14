// "use client";

import { SignOutButton, UserButton } from "@clerk/nextjs";
import { BoardList } from "./_components/board-list";

const DashboardPage = () => {

  return (
    <div className="flex-1 h-[calc(100%-65px)] p-6">
      <BoardList/>
    </div>
  )
};

export default DashboardPage;
