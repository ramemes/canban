import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useApiMutation } from "@/hooks/useApiMutation";
import { useCardModal } from "@/store/use-card-modal";
import { useEffect, useState } from "react";
import { api } from "../../../convex/_generated/api";
import { RenameInput } from "../ui/rename-input";
import { LayoutTemplate, TextIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";


export const CardModal = () => {

  const {
    isOpen,
    onClose,
    id,
    title,
    updateTitle,
    description,
  } = useCardModal()

  const { mutate: editCard, pending} = useApiMutation(api.card.editCard)
  const [isEditing, setIsEditing] = useState(false)
  const [descriptionValue, setDescriptionValue] = useState(description)


  useEffect(() => {
    setDescriptionValue(description)
  }, [description])

  if (!descriptionValue) return;

  const changeDescription = () => {
    editCard({
      id,
      description: descriptionValue
    })
    setIsEditing(false)
  }

  const cancelChangeDescription = () => {
    setDescriptionValue(description)
    setIsEditing(false)
  }

  const onCloseDialog = () => {
    setIsEditing(false)
    onClose()
  }

  return (
  <Dialog open={isOpen} onOpenChange={onCloseDialog}>
    <DialogContent 
      className="flex flex-col gap-y-8 min-w-[900px] h-[900px] bg-slate-700 text-gray-200 p-4"
    >

      {/* <DialogHeader className="flex"> */}
        <DialogTitle className="flex gap-x-2">
          <LayoutTemplate/>
          <RenameInput
            id={id}
            title={title}
            updateTitle={updateTitle}
            renameFunction={editCard}
            dataType="card"
            className="flex items-center justify-between gap-x-1 text-white font-sans"
          />
        </DialogTitle>
      {/* </DialogHeader> */}

      <div className="flex flex-row w-full gap-x-[9px]  pr-36 font-sans">
        <TextIcon className="w-7"/>
        <div className="flex flex-col w-full gap-y-6 pt-[3px]">
          <DialogTitle>
            Description
          </DialogTitle>
          <DialogDescription className="space-y-2">
            <Textarea
              className="bg-slate-800 text-gray-200 h-64 rounded-sm border-slate-400 "
              value={descriptionValue}
              onChange={(e) => setDescriptionValue(e.target.value)}
              onFocus={() => setIsEditing(true)}
            />
            {isEditing && 
              <>
                <Button
                  onClick={changeDescription}
                >
                  Save
                </Button>
                <Button
                  variant="secondary"
                  onClick={cancelChangeDescription}
                >
                  Cancel
                </Button>
              </>
            }

          </DialogDescription>

        </div>
      </div>

    </DialogContent>
  </Dialog>

  )
};

