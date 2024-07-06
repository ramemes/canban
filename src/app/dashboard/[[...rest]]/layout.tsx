import { NavBar } from "@/components/navbar/navbar";
import { SideBar } from "@/components/sidebar";

const DashboardLayout = ({
  children 
}: {children: React.ReactNode}) => {
  return (
    <main className="flex flex-col h-full ">
      <NavBar/>
      <div className="flex flex-row h-full">
        <SideBar boardPage={false}/>
        {children}
      </div>
    </main>
  )
};

export default DashboardLayout