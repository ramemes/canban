"use client";

import { useQuery } from "convex/react";
import { api } from "../../../../../convex/_generated/api";
import { Doc, Id } from "../../../../../convex/_generated/dataModel";
import { Card } from "./card";
import { useEffect, useState } from "react";

interface CardListProps {
  listId: string;
  cards: Doc<"cards">[];
}

export const CardList = ({
  listId,
  cards
}: CardListProps) => {




  // useEffect(() => {
  //   setLiveCards(cards)
  // }, [cards])

  // if (!liveCards) {
  //   return (
  //     <div>
  //       Loading Cards
  //     </div>
  //   )
  // }

  return (
    <ol className="flex flex-col h-fit ">
      {cards.map((card) => (
        <Card
          key={card._id}
          id={card._id}
          title={card.title}
          index={card.index}
          description={card.description}
          color={card.color}
        />
      ))}
    </ol>
  )
};

