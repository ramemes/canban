import { cn } from "@/lib/utils";
import { useState } from "react";
import { toast } from "sonner";

interface RenameInputProps {
  id: string;
  title: string;
  dataType: string;
  className: string;
  updateTitle: (title: string) => void;
  renameFunction: (payload: any) => any;
}

export const RenameInput = ({
  id,
  title,
  dataType,
  className,
  updateTitle,
  renameFunction,
}: RenameInputProps) => {

  const [titleEditing, setTitleEditing] = useState(false)

  

  const changeTitle = () => {
    if (title.length === 0) {
      setTitleEditing(false)
      return;
    }
    
    renameFunction({
      id: id,
      title
    })
    .catch(() => toast.error(`Failed to rename ${dataType}`))
    .finally(() => setTitleEditing(false))
  }

  return (
    <div className={className}> 
      {
      titleEditing ? 
        <input 
          value={title}
          onChange={(e) => updateTitle(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" ? changeTitle() : null}
          className="min-w-128 max-w-[700px] bg-transparent px-1 outline-2 outline outline-white  rounded-md break-words"
          autoFocus
          onBlur={changeTitle}
        />
      :
      <div 
        onClick={() => setTitleEditing(true)}
        className="max-w-[700px] px-1 hover:bg-gray-400 hover:bg-opacity-40 hover:cursor-pointer rounded-md text-md text-gray-300  break-words"
      >
        {title}
      </div> 
      }
    </div>
  )
};

