"use client"

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";

import { useApiMutation } from "../../../../hooks/useApiMutation";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { useEffect, useRef, useState } from "react";

interface NewListFormProps {
  boardId: string;
  setAddingList: any;
}
 


const newListColor = "000000"

export const NewListForm = ({
  boardId,
  setAddingList,
}: NewListFormProps) => {

  const { user } = useUser()
  const { mutate, pending } = useApiMutation(api.list.createList);

  const [listTitle, setListTitle] = useState("")
  const buttonRef = useRef(null)
  

  const createNewList = (e: any) => {
    e.preventDefault()

    if (!user) return;

    if (!listTitle) {
      toast.error("Please enter a list title")
      return
    }

    mutate({
      boardId,
      title: listTitle,
      color:  newListColor,
    })

    .catch(() => toast.error("Failed to create card"))
    .finally(() => {
      setAddingList(false)
    })

  }

  const handleBlur = (e: any) => {
    if (e.relatedTarget !== buttonRef.current) {
      setAddingList(false)
    }
  }

  const handleKeyDown = (e: any) => {
    if (e.key === "Enter") createNewList(e)
    if (e.key === "Escape") setAddingList(false)
  }

  return (
    <div className="flex flex-col gap-y-2 w-80 " onBlur={handleBlur}>
      <Input 
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}
        onKeyDown={handleKeyDown}
        className={listTitle.length < 3 ? "focus-visible:outline-red-500" :"focus-visible:outline-white"}
        autoFocus 
        placeholder="Enter List title..."
      />
      <Button 
        ref={buttonRef}
        onClick={createNewList}
        className="bg-slate-900 hover:bg-slate-800 text-white"
      >
        Add Card
      </Button>
    </div>

  )
}

