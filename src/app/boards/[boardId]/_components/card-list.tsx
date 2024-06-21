import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Id } from "../../../../../convex/_generated/dataModel";
import { Card } from "./card";

interface CardListProps {
  listId: string;

}

export const CardList = ({
  listId
}: CardListProps) => {

  const cards = useQuery(api.cards.getCards, {
    listId: listId as Id<"lists">
  })

  if (!cards) {
    return (
      <div>
        Loading Cards
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-y-2 bg-fuc">
      {cards.map((card) => (
        <Card
          key={card._id}
          id={card._id}
          title={card.title}
          description={card.description}
        />
      ))}
    </div>
  )
};

