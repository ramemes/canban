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
    <div className="h-full w-full">
      <div className="flex flex-row items-center justify-between p-3 shadow-md h-20 px-6">
        <div className="flex items-center space-x-3 px-3">
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
        <div className="flex gap-3">
          <ThemeSwitcher/>
          <Link href="/sign-in">
            <Button variant="secondary">
              Log in
            </Button>
          </Link>
          <Link href="/sign-up">     
            <Button>
              Sign Up
            </Button>
          </Link>
        </div>
      </div>
      <div 
        className="flex flex-col items-center justify-center p-8 h-[calc(100%-80px)] w-full "
      >
          <div className="flex flex-col items-center gap-10 max-w-4xl ">
            <h1 
              className={`p-1 font-semibold text-6xl text-center inline-block bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-600 to-cyan-500`}
            >
              Organize Your Projects, Simplify Collaboration
            </h1>
            <h2 className="text-center">
              Canban is your go-to app for seamless project management using the intuitive Kanban style. Whether you're working solo or with a team, Canban makes it effortless to stay organized and efficient.
            </h2>
            <Link href="/sign-up">     
            <Button className="button-wrapper w-48 h-12 font-semibold">
              <div className="button-content flex items-center justify-center w-full">
                Get Started
              </div>   
            </Button>
          </Link>
          </div>
      </div>
    </div>
  )
}

export default LandingPage;