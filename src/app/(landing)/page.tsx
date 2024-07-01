import { ThemeSwitcher } from "@/components/navbar/theme-switcher";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { SignIn } from "@clerk/nextjs";
import { Poppins } from "next/font/google";
import Image from "next/image";
import Link from "next/link";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

const LandingPage = () => {
  return (
    <div>
      <div className="flex flex-row items-center justify-between p-3 shadow-md">
        <div className="flex items-center space-x-3 px-1">
          <Image
            src="/logo.svg" 
            alt="logo"
            width={60}
            height={60}
          />
          <span className={cn("font-semibold text-2xl",
            font.className
          )}>
            Canban
          </span>
        </div>
        <div className="flex gap-2">
          <ThemeSwitcher/>
          <Link href="/sign-in">
            <Button>
              Sign In
            </Button>
          </Link>
          <Link href="/sign-up">     
            <Button>
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
      <div className="p-8">
        Welcome to Canban!
      </div>
    </div>
  )
}

export default LandingPage;