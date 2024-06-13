import { Button } from "@/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div>
      <Image
        src="/logo.svg" 
        alt="logo"
        width={120}
        height={120}
      />
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
      Welcome to Canban!
    </div>
  )
}

export default LandingPage;