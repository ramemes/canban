import { SideBar } from "@/app/dashboard/_components/sidebar";
import { NavBar } from "@/components/navbar/navbar";


export const BoardPageLayout = ({
  children 
}: {children: React.ReactNode}) => {
  return (
    <main className="flex flex-col h-full">
      <NavBar/>
      <div className="flex flex-row h-full">
        <SideBar/>
        {children}
      </div>
    </main>
  )
};

export default BoardPageLayout