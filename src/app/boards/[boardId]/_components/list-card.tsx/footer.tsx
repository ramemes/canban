import { Input } from "@/components/ui/input";
import { LayoutTemplate } from "lucide-react";
import { useState } from "react";
import { NewCardForm } from "../new-card-form";

interface FooterProps {
  listId: string;
}


export const Footer = ({
  listId
}: FooterProps) => {
  const [addingCard, setAddingCard] = useState(false)
  const [cardTitle, setCardTitle] = useState("")


  return (
    <div className="flex flex-row justify-between items-center space-x-4">
      {!addingCard ? 
        <div 
          className="flex-1 bg-gray-400 rounded-lg p-1 pl-2 hover:bg-opacity-70 hover:cursor-pointer"
          onClick={() => setAddingCard(true)}
        >
          + Add a card
        </div>
        :
        // <Input 
        //   value={cardTitle}
        //   onChange={(e) => setCardTitle(e.target.value)}
        // />

        <NewCardForm 
          listId={listId}
          setAddingCard={setAddingCard}
        />
      }


      <div className="bg-gray-200 p-1 rounded-lg">
        <LayoutTemplate/>
      </div>
    </div>
  )
};

