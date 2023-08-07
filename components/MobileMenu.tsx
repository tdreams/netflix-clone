import React from "react";

interface MobileMenuProps {
  visible?: boolean;
}

const MobileMenu = ({ visible }: MobileMenuProps) => {
  if (!visible) {
    return null;
  }
  return (
    <div className="bg-black w-56 absolute top-8 left-0 py-5 flex-col border-2 border-gray-800 flex">
      <div className="flex flex-col gap-4">
        <div className="px-3 text-white hover:underline text-center">Home</div>
        <div className="px-3 text-white hover:underline text-center">
          Series
        </div>
        <div className="px-3 text-white hover:underline text-center">Films</div>
        <div className="px-3 text-white hover:underline text-center">
          New & Popular
        </div>
        <div className="px-3 text-white hover:underline text-center">
          My List
        </div>
        <div className="px-3 text-white hover:underline text-center">
          Browse by languages
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
