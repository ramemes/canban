"use client";

import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher, useUser } from "@clerk/nextjs";
import { LayoutDashboard, Star } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useDarkMode } from "usehooks-ts";

export const SideBar = ( {boardPage} : {boardPage: boolean}) => {
  
  const searchParams = useSearchParams()
  const favorites = searchParams.get("favorites")

  const { theme, setTheme } = useTheme()


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
      {!boardPage && 
          <OrganizationSwitcher 
            afterLeaveOrganizationUrl="/dashboard"
            afterCreateOrganizationUrl="/dashboard"
            hidePersonal
            appearance={{
              elements: {
                rootBox: {
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  width: "100%",

                },
                organizationSwitcherTrigger: {
                  padding: "6px",
                  width: "90%",
                  scale: "1.1",
                  borderRadius: "8px",
                  border: "1px solid #E5E7EB",
                  justifyContent: "space-between",
                  color: theme === "light" ? "black" : "white !important",
                  backgroundColor: theme === "light" ? "white" : "transparent",
                  "&:hover": { 
                    backgroundColor: theme === "light" ? "lightgray" : "#1e293b",
                  }
                },

                organizationSwitcherTrigger__open: {
                  color: theme === "light" ? "black" : "white",
                  backgroundColor: theme === "light" ? "white" : "transparent",
                },
                organizationSwitcherTrigger__close: {
                  color: theme === "light" ? "black" : "white",
                  backgroundColor: theme === "light" ? "white" : "transparent",
                },
              }  
            }}
          />
        }

      
      </div>
    </div>
    
  )
};

