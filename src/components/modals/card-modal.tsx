import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useCardModal } from "@/store/use-card-modal";


export const CardModal = () => {

  const {
    isOpen,
    onClose,
    initialValues,
  } = useCardModal()




  return (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent className="flex flex-col gap-y-8 min-w-[900px] h-[900px] bg-gray-300">

      <DialogHeader className="flex gap-8">
        <DialogTitle>{initialValues.title}</DialogTitle>
      </DialogHeader>

      <div>
        <DialogTitle>Description</DialogTitle>
        <DialogDescription>
          {initialValues.description}
        </DialogDescription>
      </div>

    </DialogContent>
  </Dialog>

  )
};

