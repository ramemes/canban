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

interface NewListFormProps {
  boardId: string;
  setAddingList: any;
  // listsLength: number;
}
 
const formSchema = z.object({
  title: z.string().min(2).max(50),
})

const newListColor = "000000"

export const NewListForm = ({
  boardId,
  setAddingList,
  // listsLength
}: NewListFormProps) => {

  const { user } = useUser()
  const { mutate, pending } = useApiMutation(api.list.createList);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })


  const listsLength = useQuery(api.lists.getListsLength, {
    boardId: boardId as Id<"boards">,
  })


  const createNewList = () => {
    const values = form.getValues()
    if (!user) return;

    mutate({
      boardId,
      title: values.title,
      color:  newListColor,
      index: listsLength    
    })
    .catch((err) => {
      console.log(err)
      toast.error("Failed to create list")
    })
    .finally(() => {
      setAddingList(false)
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(createNewList)} onBlur={() => setAddingList(false)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Enter list title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Add List</Button>
      </form>
    </Form>
  )
}

