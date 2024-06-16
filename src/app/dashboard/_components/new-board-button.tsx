import { Plus } from "lucide-react";
import { useApiMutation } from "../../../../hooks/useApiMutation";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";

interface NewBoardButtonProps {
  authorId: string;
}



export const NewBoardButton = ({
  authorId
}: NewBoardButtonProps) => {
  const router = useRouter();
  const { user } = useUser()
  const {mutate, pending} = useApiMutation(api.board.createBoard)

  const createBoard = () => {
    if (!user) return;

    mutate({
      authorId: authorId,
      title: "Untitled",
    })
    // .then((board) => {
    //   toast.success("Board created");
    //   router.push(`/boards/${id}`)
    // })
  }
  
  return (
    <button
    disabled={pending}
    >
    <div 
    className="flex flex-col bg-fuchsia-600 justify-center items-center aspect-[900/600] rounded-md text-white bg-black hover:bg-fuchsia-700  hover:cursor-pointer hover:shadow-3xl"
    >
      <Plus/>
      <p className="z-[1] text-sm">
        New Board
      </p>
    </div>
    </button>
  )
};

