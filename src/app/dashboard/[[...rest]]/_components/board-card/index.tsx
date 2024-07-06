"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "./footer";
// import { Overlay } from "./overlay";
import { BoardCardActions } from "./board-card-actions";
import { MoreHorizontal } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface BoardCardProps {
  title: string;
  image: string;
  id: string;
}

export const BoardCard = ({
  title,
  image,
  id
}: BoardCardProps) => {

  const [showActions, setShowActions] = useState(false)

  return (
    <Link href={`/board/${id}`}>
      <div 
        className="flex relative flex-col overflow-hidden rounded-lg justify-center outline-1 aspect-[900/720] outline-gray-200 outline "
      >
        <div 
          className="flex relative flex-col aspect-[900/600] overflow-hidden rounded-t-md transition-opacity hover:opacity-80"
          onMouseEnter={() => setShowActions(true)}
          onMouseLeave={() => setShowActions(false)}
        >
          <Image
            src={image}
            alt={title}
            // fill
            width={900}
            height={600}
            className="h-[1000px] overflow-visible"
          />
          <BoardCardActions
            id={id}
            title={title}
            side="right"
            tableType="boards"
          > 
            <button
              className={cn(`absolute top-1 right-1  
                transition-opacity px-3
                py-2 outline-none `)}
            >
              <MoreHorizontal
                className={cn(`w-7 h-7 text-white opacity-80 hover:opacity-100 transition-opacity`, !showActions && "hidden")}
              />
            </button>    

          </BoardCardActions> 
        </div>
        <Footer title={title}/>
      </div>

    </Link>
  )
};

