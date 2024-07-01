import { SignOutButton, UserButton, useUser } from "@clerk/nextjs";
import { BoardList } from "./_components/board-list";

interface DashboardPageProps {
  searchParams: {
    search?: string;
  }
}



const DashboardPage = ({
  searchParams,
}:DashboardPageProps) => {
  const { user } = useUser()

  return (
    <div className="flex-1 w-full h-[calc(100%-65px)] p-6">
      {!user ? "User not found" 
      :
        <BoardList
          authorId={user.id}
          query={searchParams}
        />
      }

    </div>
  )
};

export default DashboardPage;
