import { SignIn } from "@clerk/nextjs"

const Page = () => {
  return <SignIn forceRedirectUrl="/dashboard" signUpUrl="/sign-up"/>
};

export default Page;
