import { Input } from "@/components/ui/input";
import { LayoutTemplate, Plus } from "lucide-react";
import { useState } from "react";
import { NewCardForm } from "../new-card-form";
import { Button } from "@/components/ui/button";

interface FooterProps {
  listId: string;
}


export const Footer = ({
  listId
}: FooterProps) => {
  const [addingCard, setAddingCard] = useState(false)
  const [cardTitle, setCardTitle] = useState("")


  if (addingCard) {
    return (
      <NewCardForm 
      listId={listId}
      setAddingCard={setAddingCard}
    />
    )
  } else {
    return (
      <div className="flex flex-row items-center justify-between gap-x-2">
      <div 
        className="flex flex-1 py-2 border-sm bg-gray-300 text-white bg-opacity-15 rounded-lg p-1 pl-2 hover:bg-opacity-30 hover:cursor-pointer"
        onClick={() => setAddingCard(true)}
      >
        <Plus className="mr-1 w-5"/>
         Add a card
      </div>
      <div className="bg-gray-600 text-gray-300 p-1 rounded-lg hover:cursor-pointer hover:bg-gray-500">
          <LayoutTemplate/>
      </div>
    </div>
    )
  }
  

};

