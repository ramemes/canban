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
 
interface BoardNavProps {
  title: string;
}

export const BoardNav = ({
  title
}: BoardNavProps) => {


  const editBoardTitle = () => {
    return
  }


  return (
    <div className="bg-black opacity-30 p-3">

      <Dialog>
      <DialogTrigger asChild>
        <div 
          className="w-fit p-1 hover:bg-gray-500 hover:cursor-pointer rounded-md text-white font-semibold "
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
          />

        <DialogFooter>
          {/* <DialogClose asChild> */}
            <Button type="submit" onClick={editBoardTitle}>Save changes</Button>
          {/* </DialogClose> */}
        </DialogFooter>
      </DialogContent>
    </Dialog>
    </div>

  )
};

