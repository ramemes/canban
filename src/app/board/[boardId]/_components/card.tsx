import { CardModal } from "@/components/modals/card-modal";
import { useCardModal } from "@/store/use-card-modal";
import { Pencil } from "lucide-react";

interface CardProps {
  id: string;
  title: string;
  description: string;
  color: string
}


export const Card = ({
  id,
  title,
  description,
  color
}: CardProps) => {

  const {
    onOpen
  } = useCardModal();



  return (
      <div 
        onClick={() => onOpen(id, title, description)}
        className="flex justify-between items-center rounded-lg bg-slate-600 text-white px-3 p-2 text-[14px] cursor-pointer hover:outline-1 hover:outline-slate-400 hover:outline"
      >
        <div className="flex flex-col">
          <div 
            className="w-10 h-2 rounded-sm my-1"
            style={{backgroundColor:`#${color}`}}
          />
          <div className="break-words w-60">
            {title}
          </div>
        </div>

      </div>

  )
};

