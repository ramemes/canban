import { Button } from "@/components/ui/button";
import { SignIn } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";

interface LandingPageLayoutProps {
  children: React.ReactNode;
};

const LandingPageLayout = ({
  children
}: LandingPageLayoutProps) => {
  return (
    <>
      {children}
    </>
  )
}

export default LandingPageLayout;