import { Plus } from "lucide-react";
import { useApiMutation } from "../../../hooks/useApiMutation";
import { api } from "../../../../convex/_generated/api";
import { useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { toast } from "sonner";
import { imgFromPublic } from "../../../../utils/utils";
import { useNewBoardModal } from "@/store/use-new-board-modal";

interface NewBoardButtonProps {
  authorId: string;
}



export const NewBoardButton = ({
  authorId
}: NewBoardButtonProps) => {
  const { user } = useUser()
  const {onOpen} = useNewBoardModal()

  if (!user) return;

  
  return (
    <button
      onClick={() => onOpen(authorId)}
      // disabled={pending}
    >
      <div className="flex flex-col bg-fuchsia-600 justify-center items-center aspect-[900/750] rounded-md text-white  hover:bg-fuchsia-700  cursor-pointer ">
        <Plus/>
        <p className="z-[1] text-sm">
          New Board
        </p>
      </div>
    </button>
  )
};

