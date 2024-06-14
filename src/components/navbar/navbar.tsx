import { cn } from "@/lib/utils";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { SearchInput } from "./search-input";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const NavBar = () => {
  return (
    <div className="flex items-center justify-between gap-x-4 p-3 w-full h-[55px] bg-slate-500">
      <Link href="/dashboard">
        <div className="flex items-center justify-center gap-x-2 w-48">
          <Image
            src="./logo.svg"
            width={50}
            height={50}
            alt="logo"
          />
          <span className={cn("font-semibold text-2xl",
            font.className
          )}>
            Canban
          </span>
        </div>
      </Link>


      <div className="flex items-center gap-x-4">
        <SearchInput/>
        <UserButton/>
      </div>
      
    </div>
  )
};

