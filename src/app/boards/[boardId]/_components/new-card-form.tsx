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
import { ReactEventHandler, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

interface NewCardFormProps {
  listId: string;
  setAddingCard: any;
}


const newCardColor = "000000"


export const NewCardForm = ({
  listId,
  setAddingCard
}: NewCardFormProps) => {

  const { user } = useUser()
  const { mutate, pending } = useApiMutation(api.card.createCard);

  const [cardTitle, setCardTitle] = useState("")


  const createNewCard = (e: any) => {
    e.preventDefault()

    if (!user) return;

    if (!cardTitle) {
      toast.error("Please enter a card title")
      return
    }

    mutate({
      listId,
      title: cardTitle,
      color:  newCardColor,
      description: ""   
    })

    .catch(() => toast.error("Failed to create card"))
    .finally(() => {
      setAddingCard(false)
    })

  }


  return (
    <div className="flex flex-col gap-y-2" onBlur={() => setAddingCard(false)}>
      <Input 
        value={cardTitle}
        onChange={(e) => setCardTitle(e.target.value)}
        onKeyDown={(e) => {e.key === "Enter" ? createNewCard(e) : null}}
        className={cardTitle.length < 3 ? "focus-visible:outline-red-500" :"focus-visible:outline-white"}
        autoFocus 
        placeholder="Enter card title..."
      />
      <Button 
        onClick={createNewCard}
        className="bg-blue-600 hover:bg-blue-500"
      >
        Add Card
      </Button>
    </div>
  )
};

