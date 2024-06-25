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
  id,
}: BoardCardProps) => {


  return (
    <Link href={`/board/${id}`}>
      <div 
        className="flex relative flex-col overflow-hidden rounded-lg justify-center outline-1 aspect-[900/750] outline-gray-200 outline"
      >
        <div className="flex relative flex-col aspect-[900/600] overflow-hidden rounded-t-md  hover:opacity-80 transition-opacity bg-black">
          <Image
            src={image}
            alt={title}
            fill
            className="object-fit"
          />
          <BoardCardActions
            id={id}
            title={title}
            side="right"
            tableType="boards"
          > 
            <button
              className="absolute top-1 right-1  
                transition-opacity px-3
              py-2 outline-none"
            >
              <MoreHorizontal
                className="text-white text-border-white  transition-opacity"
              />
            </button>    

          </BoardCardActions> 
        </div>
        <Footer title={title}/>
      </div>

    </Link>
  )
};

