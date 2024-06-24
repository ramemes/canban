
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Poppins } from "next/font/google";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import { SearchInput } from "./search-input";
import { ThemeSwitcher } from "./theme-switcher";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export const NavBar = () => {
  return (
    <div className="z-[1] flex items-center justify-between gap-x-12 p-3 w-full h-[70px] shadow-zinc-300 shadow-sm">
      <Link href="/dashboard">
        <div className="flex items-center justify-center gap-x-2 w-44 ml-3">
          <Image
            src="/logo.svg"
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

      <SearchInput/>
      <div className="flex items-center gap-x-5 pr-1">
        <ThemeSwitcher/>
        <UserButton/>
      </div>
      
    </div>
  )
};

