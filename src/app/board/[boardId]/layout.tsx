"use client";


import { SideBar } from "@/components/sidebar";
import { BoardNavBar } from "./board-navbar";
import { Protect } from "@clerk/nextjs";
import { Loading } from "@/components/auth/loading";


const BoardPageLayout = ({
  children 
}: {children: React.ReactNode}) => {
  return (
    <Protect 
      fallback={<Loading/>}
      condition={has => has({role: "org:admin"}) || has({role: "org:member"})}
    > 
      <main className="flex flex-col h-full">
        <BoardNavBar/>
        <div className="flex flex-row h-full">
          <SideBar 
            boardPage={true}
          />
          {children}
        </div>
      </main>
    </Protect>
  )
};

export default BoardPageLayout