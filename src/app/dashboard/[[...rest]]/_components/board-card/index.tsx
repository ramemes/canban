"use client";

import Image from "next/image";
import Link from "next/link";
import { Footer } from "./footer";
// import { Overlay } from "./overlay";
import { BoardCardActions } from "./board-card-actions";
import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { useRenameModal } from "@/store/use-rename-modal";

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
  const { onOpen } = useRenameModal();

  const [showActions, setShowActions] = useState(false)
  // const actionsRef = useRef<HTMLDivElement>(null);

  // const handleClickOutside = (event: MouseEvent) => {
  //   if (actionsRef.current && !actionsRef.current.contains(event.target as Node)) {
  //     setShowActions(false); // Example function to call
  //   }
  // };

  // useEffect(() => {
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () => {
  //     document.removeEventListener("mousedown", handleClickOutside);
  //   };
  // }, []);

  return (
    <Link href={`/board/${id}`}>
      <div 
  
        className="flex relative flex-col overflow-hidden rounded-lg justify-center outline-1 aspect-[900/720] outline-gray-200 outline hover:opacity-80"
        onMouseEnter={() => setShowActions(true)}
        onMouseLeave={() => setShowActions(false)}
      >
        <div 
          className="flex relative flex-col aspect-[900/600] overflow-hidden rounded-t-md transition-opacity"
        >
          <Image
            src={image}
            alt={title}
            // fill
            width={900}
            height={600}
            className="h-[1000px] overflow-visible"
          />
          <div
            // ref={actionsRef}
            onMouseEnter={(e) => e.stopPropagation()}
            onMouseLeave={(e) => e.stopPropagation()} 
            onBlur={(e) => e.stopPropagation()} 
          >
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

        </div>
        <Footer title={title}/>
      </div>

    </Link>
  )
};

