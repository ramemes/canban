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
    <div className="flex flex-col bg-blue-500 h-fit w-64 p-3  gap-y-3">
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

