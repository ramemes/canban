
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
    <div className="rounded-lg bg-slate-600 text-white p-2  text-[14px]">
      {title}
    </div>
  )
};

