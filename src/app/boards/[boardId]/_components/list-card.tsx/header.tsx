
interface HeaderProps  {
  title: string;
}

export const Header = ({
  title
}: HeaderProps) => {
  return (
    <div>
      {title}
    </div>
  )
};

