"use client";

import Image from "next/image";
import Link from "next/link";

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
    <Link href={`/boards/${id}`}>

      <div className="flex flex-col aspect-[900/600] rounded-md text-white bg-black hover:bg-opacity-85 hover:shadow-3xl">
        <div className="relative flex flex-1 rounded-md p-3">
          <Image
            src={image}
            alt={title}
            fill
            className="z-[0] rounded-md hover:opacity-75"
          />
          <p className="z-[1] font-semibold ">
            {title}
          </p>
        </div>
      </div>
    </Link>

  )
};

