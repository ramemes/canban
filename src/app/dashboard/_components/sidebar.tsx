"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LayoutDashboard, Star } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export const SideBar = () => {
  const searchParams = useSearchParams()
  const favorites = searchParams.get("favorites")
  return (
    <div className="z-[2] left-0 h-full w-52 flex pt-6 p-5 flex-col gap-y-2">
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

      <Button 
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
      </Button>
      
    </div>
  )
};

