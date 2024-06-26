import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useApiMutation } from "@/hooks/useApiMutation";
import { useCardModal } from "@/store/use-card-modal";
import { useState } from "react";
import { api } from "../../../convex/_generated/api";
import { RenameInput } from "../ui/rename-input";
import { LayoutTemplate, TextIcon } from "lucide-react";
import { Textarea } from "../ui/textarea";


export const CardModal = () => {

  const {
    isOpen,
    onClose,
    initialValues,
  } = useCardModal()

  const { mutate: editCard, pending} = useApiMutation(api.card.editCard)

  // console.log(initialValues.title)

  return (
  <Dialog open={isOpen} onOpenChange={onClose}>
    <DialogContent 
      className="flex flex-col gap-y-8 min-w-[900px] h-[900px] bg-slate-700 text-gray-200 p-4"
    >

      {/* <DialogHeader className="flex"> */}
        <DialogTitle className="flex gap-x-2">
          <LayoutTemplate/>
          <RenameInput
            id={initialValues.id}
            title={initialValues.title}
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
          <DialogDescription>
            <Textarea
              className="bg-slate-800 text-gray-200 h-64 rounded-sm border-slate-400"
              value={initialValues.description}
              readOnly
            />
          </DialogDescription>

        </div>
      </div>

    </DialogContent>
  </Dialog>

  )
};

