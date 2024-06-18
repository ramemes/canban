interface NewListButtonProps {
  boardId: string;
}

export const NewListButton = ({
  boardId
}: NewListButtonProps) => {
  return (
    <div className="w-64 bg-slate-400 h-fit p-3 rounded-lg hover:bg-opacity-70 hover:cursor-pointer">
      + Add another list
    </div>
  )
};

