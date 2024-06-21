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
import { useEffect } from "react";

interface NewCardFormProps {
  listId: string;
  setAddingCard: any;
}

const formSchema = z.object({
  title: z.string().min(2).max(100),
})

const newCardColor = "000000"


export const NewCardForm = ({
  listId,
  setAddingCard
}: NewCardFormProps) => {

  const { user } = useUser()
  const { mutate, pending } = useApiMutation(api.card.createCard);


  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  })

  const createNewCard = () => {

    const values = form.getValues()
    if (!user) return;

    mutate({
      listId,
      title: values.title,
      color:  newCardColor ,
      description: ""   
    })

    .catch(() => toast.error("Failed to create card"))
    .finally(() => {
      setAddingCard(false)
    })


  }

  return (
    <Form {...form}>
    <form onSubmit={form.handleSubmit(createNewCard)} onBlur={() => setAddingCard(false)} className="space-y-2">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input autoFocus placeholder="Enter card title..." {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button type="submit">Add Card</Button>
    </form>
  </Form>
  )
};

