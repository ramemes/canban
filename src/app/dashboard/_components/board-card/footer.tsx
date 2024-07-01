"use client";

interface FooterProps {
  title: string
}

export const Footer = ({
  title
}: FooterProps) => {
  return (
    <div className="flex p-3 h-16 text-sm justify-start">
      {title}
    </div>

  )
};

