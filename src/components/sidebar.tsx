"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const SideBar = () => {
  const user = useUser()
  

  const searchParams = useSearchParams()
  const favorites = searchParams.get("favorites")

  return (
    <div className="flex flex-col min-w-64  max-sm:hidden">

      <div className="z-[0] left-0 h-full w-full flex pt-6 p-6 flex-col gap-y-2 ">
      <Button 
        variant={favorites ? "ghost" : null}
        asChild
        size="lg"
        className={cn(
          "font-normal justify-start pl-3 pr-3 w-full",
          !favorites && "bg-blue-200 text-blue-700"
        )}
      >
        <Link href="/dashboard">
          <LayoutDashboard className="h-4 w-5 mr-2"/>
          Boards
        </Link>

      </Button>

      {/* <Button 
        variant={!favorites ? "ghost" : null}
        asChild
        size="lg"
        className={cn(
          "font-normal justify-start pl-3 pr-3 w-full",
          favorites && "bg-blue-200 text-blue-700"
        )}
      >
        <Link href="/dashboard">
          <Star className="h-4 w-5 mr-2"/>
          Favorites
        </Link>
      </Button> */}
      
      </div>
    </div>
    
  )
};

