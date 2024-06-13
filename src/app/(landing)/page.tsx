import { Button } from "@/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

const LandingPage = () => {
  return (
    <div>
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