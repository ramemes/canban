import { NavBar } from "../../components/navbar/navbar";
import { SideBar } from "./_components/sidebar";

export const DashboardLayout = ({
  children 
}: {children: React.ReactNode}) => {
  return (
    <main className="flex flex-col h-full">
      <NavBar/>
      <div className="flex flex-row flex-1">
        <SideBar />
        {children}
      </div>
      
    </main>
  )
};

export default DashboardLayout