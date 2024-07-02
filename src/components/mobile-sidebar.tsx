"use client";

import { Cross, LayoutDashboard, Menu } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetClose, SheetContent, SheetTrigger } from "./ui/sheet";
import { SideBar } from "./sidebar";
import { useEffect, useState } from "react";
import { SearchInput } from "./navbar/search-input";
import Link from "next/link";
import { cn } from "@/lib/utils";



const MobileSidebar = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger>
        <Button variant="ghost" size="icon" className="sm:hidden" asChild>
          <Menu/>
        </Button>
      </SheetTrigger>
      <SheetContent side="left" >
        {/* <SearchInput className="w-fit"/> */}
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
      </SheetContent>

    </Sheet>
  )
};

export default MobileSidebar;
