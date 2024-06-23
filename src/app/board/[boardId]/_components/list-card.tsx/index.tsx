import { cn } from "@/lib/utils";
import { CardList } from "../card-list";
import { Footer } from "./footer";
import { Header } from "./header";

interface ListCardProps {
  listId: string;
  title: string;
  color: string;
  creationTime: number;
}


export const ListCard = ({
  listId,
  title,
  color,
  creationTime
}: ListCardProps) => {
  return (
    <div 
      className="flex flex-col bg-gradient-to-tr from-slate-600 to-slate-800 h-fit w-80 p-3  gap-y-3 rounded-xl"
    >
      <Header
        title={title}
      />
      <CardList
        listId={listId}
      />
      <Footer
        listId={listId}/>
    </div>
  )
};

