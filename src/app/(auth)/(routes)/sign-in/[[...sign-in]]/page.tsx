import { SignIn } from "@clerk/nextjs"

const Page = () => {
  return <SignIn forceRedirectUrl="/dashboard"/>
};

export default Page;
