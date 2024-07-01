import { Draggable, Droppable } from "@hello-pangea/dnd";
import { CardList } from "../card-list";
import { Footer } from "./footer";
import { Header } from "./header";
import { cn } from "@/lib/utils";
import { useQuery } from "convex/react";
import { api } from "../../../../../../convex/_generated/api";
import { Doc, Id } from "../../../../../../convex/_generated/dataModel";

interface ListCardProps {
  listId: string;
  title: string;
  color: string;
  index: number;
  creationTime: number;
  cards: Doc<"cards">[]
}


export const ListCard = ({
  listId,
  title,
  color,
  index,
  creationTime,
  cards
}: ListCardProps) => {

  // const cards = useQuery(api.cards.getCards, {
  //   listId: listId as Id<"lists">
  // })

  if (!cards) {
    return (
      <div>
        Loading Cards
      </div>
    )
  }

  return (
    <Draggable draggableId={listId} index={index}>
      {(provided) => (
        <div 
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className={cn("flex flex-col bg-gradient-to-tr from-slate-600 to-slate-800 h-fit min-w-80 p-3 gap-y-3 mx-2 rounded-md")}
        >
          <Header
            listId={listId}
            title={title}
          />
          <Droppable droppableId={listId} type="card">
            {(provided) => (
              <div 
                ref={provided.innerRef} 
                className="h-fit"          
              >
                <CardList
                  listId={listId}
                  cards={cards}
                />
                {provided.placeholder}
              </div>
            )}

          </Droppable>

          <Footer
            listId={listId}/>
        </div>
      )}

    </Draggable>
  )
};


ListCard.Skeleton = () => {
  return (
    <div 
    className="flex flex-col bg-gradient-to-tr opacity-30 from-slate-600 to-slate-800 h-96 w-80" 
  >
    Loading cards
  </div>
  )
}