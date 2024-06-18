
interface CardProps {
  id: string;
  title: string;
  description: string;
}


export const Card = ({
  id,
  title,
  description
}: CardProps) => {
  return (
    <div className="rounded-lg bg-gray-400 p-1">
      {title}
    </div>
  )
};

