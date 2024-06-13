import { SignUp } from "@clerk/nextjs"

const Page = () => {
  return <SignUp forceRedirectUrl="/dashboard" signInUrl="/sign-in"/>
};

export default Page;
