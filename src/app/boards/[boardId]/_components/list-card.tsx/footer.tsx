import { LayoutTemplate } from "lucide-react";

export const Footer = () => {
  return (
    <div className="flex flex-row justify-between items-center space-x-4">
      <div className="flex-1 bg-gray-400 rounded-lg p-1 pl-2 hover:bg-opacity-70 hover:cursor-pointer">
        + Add a card
      </div>
      <div className="bg-gray-200 p-1 rounded-lg">
        <LayoutTemplate/>
      </div>
    </div>
  )
};

