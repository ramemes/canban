import { Search } from "lucide-react";
import { Input } from "../ui/input";

export const SearchInput = () => {
  return (
    <div className="w-full relative">
      <Search 
        className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4 "
      />
      <Input
        className="w-full max-w-[416px] pl-9 h-[40px] border-neutral-500 border-[1px]"
        placeholder="Search boards"
      />
    </div>
  )
};

