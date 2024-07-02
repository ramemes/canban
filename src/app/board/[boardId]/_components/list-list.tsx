"use client";

import { useQuery } from "convex/react";
import { ListCard } from "./list-card.tsx/index.tsx";
import { api } from "../../../../../convex/_generated/api.js";
import { Doc, Id } from "../../../../../convex/_generated/dataModel.js";
import { NewListButton } from "./new-list-button.tsx";
import { useEffect, useState } from "react";
import { DragDropContext, Droppable } from "@hello-pangea/dnd";
import { useApiMutation } from "@/hooks/useApiMutation.ts";
import { cn } from "@/lib/utils.ts";

interface ListWithCards extends Doc<"lists"> {
  cards: Doc<"cards">[];
}


interface ListListProps {
  boardId: string;
  listsCards: ListWithCards[]
}



function reorder<T>(lists: T[], startIndex: number, endIndex: number) {
  const result = Array.from(lists)
  const [removed] = result.splice(startIndex, 1);
  result.splice(endIndex, 0, removed)

  return result
}



export const ListList = ({
  boardId,
  listsCards,
}: ListListProps) => {

  const { mutate: mutateLists, pending: listsPending } = useApiMutation(api.lists.reorderLists)

  const { mutate: mutateCards, pending: cardsPending } = useApiMutation(api.cards.reorderCards)

  const [liveListsCards, setLiveListsCards] = useState(listsCards)

  useEffect(() => {
    setLiveListsCards(listsCards)
    console.log("hi")
  }, [listsCards])


  if (!liveListsCards) {
    return (
      <div className="flex flex-row p-8 gap-x-4 h-full overflow-x-scroll  touch-pan-x z-[1] ">
        <ListCard.Skeleton/>
        <ListCard.Skeleton/>
        <ListCard.Skeleton/>
        <ListCard.Skeleton/>
      </div>
    )
  }



  const onDragEnd = (result: any) => {
    const { destination, source, type} = result;

    if (!destination) {
      return;
    }
    //Dropped in same position
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }
    //User moves a list
    if (type === "list") {
      const items = reorder(
        liveListsCards,
        source.index,
        destination.index
      ).map((item, index) => ({...item, index}))

      setLiveListsCards(items)
      mutateLists({
        boardId,
        reorderedListIds: items.map((item) => item._id)
      })
    }
    if (type === "card") {
      let newLiveListsCards = [...liveListsCards]
      const sourceList = newLiveListsCards.find(list => list._id === source.droppableId)
      const destList = newLiveListsCards.find(list => list._id === destination.droppableId)

      if (!sourceList || !destList) {
        return;
      }

      if (source.droppableId === destination.droppableId) {
        const reorderedCards = reorder(
          sourceList.cards,
          source.index,
          destination.index
        ).map((card, index) => ({...card, index}))

        sourceList.cards = reorderedCards;

        setLiveListsCards(newLiveListsCards)
        mutateCards({
          listId: sourceList._id,
          reorderedCardIds: reorderedCards.map((card) => card._id)
        })
      }

    }

  }



  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol 
            {...provided.droppableProps}
            ref={provided.innerRef}
            className={cn("flex flex-row p-8 h-full overflow-x-scroll z-[1] ")}
          >
            {liveListsCards.map((list, index) => (
                <ListCard 
                key={list._id}
                index={list.index}
                listId={list._id}
                title={list.title}
                color={list.color}
                cards={list.cards}
                creationTime={list._creationTime}
              />
            ))}
            
            {provided.placeholder}
            <NewListButton
              boardId={boardId}
            />
          </ol>
        )}

      </Droppable>

    </DragDropContext>

  )
};

