"use client";


import { SideBar } from "@/components/sidebar";
import { BoardNavBar } from "./board-nav-bar";


const BoardPageLayout = ({
  children 
}: {children: React.ReactNode}) => {
  return (
    <main className="flex flex-col h-full">
      <BoardNavBar/>
      <div className="flex flex-row h-full">
        <SideBar/>
        {children}
      </div>
    </main>
  )
};

export default BoardPageLayout