import { SignUp } from "@clerk/nextjs"

const Page = () => {
  return <SignUp forceRedirectUrl="/dashboard"/>
};

export default Page;
