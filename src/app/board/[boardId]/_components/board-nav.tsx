import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useApiMutation } from "../../../../../hooks/useApiMutation";
import { api } from "../../../../../convex/_generated/api";
import { useUser } from "@clerk/nextjs";
import { useState } from "react";
import { toast } from "sonner";
 
interface BoardNavProps {
  title: string;
  boardId: string
}

export const BoardNav = ({
  title,
  boardId
}: BoardNavProps) => {
  const { user } = useUser()
  const { mutate, pending } = useApiMutation(api.board.editBoardTitle)

  const [renameOpen, setRenameOpen] = useState(false)
  const [titleInput, setTitleInput] = useState(title)


  const editTitle = () => {
    if (!user) return;
    if (titleInput === title) return;
    mutate({
      boardId: boardId, 
      title: titleInput
    })
    .then(() => setRenameOpen(false))
    .catch(() => toast.error("Unable to change board title"))
  }

  return (
    <div className="bg-black bg-opacity-15 p-3 px-4 z-[2]">
      <form>
        <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
          <DialogTrigger asChild>
            <div 
              onClick={() => setTitleInput(title)}
              className="w-fit p-1 hover:bg-gray-400 hover:bg-opacity-40 hover:cursor-pointer rounded-md  font-semibold "
            >
              {title}
            </div>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Edit Title</DialogTitle>
              <DialogDescription>
                Enter a new title for your board
              </DialogDescription>
            </DialogHeader>
              <Input
                id="name"
                placeholder={title}
                value={titleInput}
                onChange={(e) => setTitleInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" ? editTitle() : ""}
              />

            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={editTitle}>Save changes</Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </form>
    </div>

  )
};

