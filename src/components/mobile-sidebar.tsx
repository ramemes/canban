"use client";

import { Cross, LayoutDashboard, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTrigger } from "./ui/sheet";
import { SideBar } from "./sidebar";
import { useEffect, useState } from "react";
import { SearchInput } from "./navbar/search-input";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { OrganizationSwitcher } from "@clerk/nextjs";
import { useTheme } from "next-themes";
import { z } from "zod";



const MobileSidebar = ({boardPage} : {boardPage: boolean}) => {
  const [isMounted, setIsMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet modal={false}>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="sm:hidden" asChild>
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col items-center w-64" >
        <Button 
          asChild
          size="lg"
          className={cn(
            "font-normal w-48 mt-8"
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
        
      </SheetContent>
    </Sheet>
  )
};

export default MobileSidebar;
