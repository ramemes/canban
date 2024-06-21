import { cn } from "@/lib/utils";
import { Inter, Poppins } from "next/font/google";


interface HeaderProps  {
  title: string;
}

export const Header = ({
  title
}: HeaderProps) => {
  return (
    <div className={cn("text-white font-sans")}>
      {title}
    </div>
  )
};

