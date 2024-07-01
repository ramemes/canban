import { Loader2Icon } from "lucide-react";
import Image from "next/image";

export const Loading = () => {
  return (
    <div className="h-full w-full flex flex-col
    justify-center items-center">
      {/* <Image
        src="/loading.gif" 
        alt="logo"
        width={120}
        height={120}
        className="animate-pulse duration-1000" 
      /> */}
      <Loader2Icon className="animate-spin"/>
    </div>
  )
}