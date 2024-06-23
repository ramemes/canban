"use client"

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";

import { useForm } from "react-hook-form"
import { z } from "zod"
import { useApiMutation } from "../../../../../hooks/useApiMutation";
import { api } from "../../../../../convex/_generated/api";
import { toast } from "sonner";
import { useQuery } from "convex/react";
import { Id } from "../../../../../convex/_generated/dataModel";
import { useEffect, useRef, useState } from "react";

interface NewListFormProps {
  boardId: string;
  setAddingList: any;
}
 
const formSchema = z.object({
  title: z.string().min(2).max(50),
})

const newListColor = "000000"

export const NewListForm = ({
  boardId,
  setAddingList,
}: NewListFormProps) => {

  const { user } = useUser()
  const { mutate, pending } = useApiMutation(api.list.createList);

  const [listTitle, setListTitle] = useState("")

  const listsLength = useQuery(api.lists.getListsLength, {
    boardId: boardId as Id<"boards">,
  })

  

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
      index: listsLength    
    })

    .catch(() => toast.error("Failed to create card"))
    .finally(() => {
      setAddingList(false)
    })

  }

  return (
    <div className="flex flex-col gap-y-2 w-80" onBlur={() => setAddingList(false)}>
      <Input 
        value={listTitle}
        onChange={(e) => setListTitle(e.target.value)}
        onKeyDown={(e) => {e.key === "Enter" ? createNewList(e) : null}}
        className={listTitle.length < 3 ? "focus-visible:outline-red-500" :"focus-visible:outline-white"}
        autoFocus 
        placeholder="Enter List title..."
      />
      <Button 
        onClick={createNewList}
        className="bg-blue-600 hover:bg-blue-500"
      >
        Add Card
      </Button>
    </div>

  )
}

