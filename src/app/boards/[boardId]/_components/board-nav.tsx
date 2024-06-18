
interface BoardNavProps {
  title: string;
}

export const BoardNav = ({
  title
}: BoardNavProps) => {
  return (
    <div className="bg-purple-300 p-3">
      {title}
    </div>
  )
};

