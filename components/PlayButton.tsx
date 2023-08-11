import React from "react";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

interface PlayButtonProps {
  movieId: string | undefined;
}

const PlayButton: React.FC<PlayButtonProps> = ({ movieId }) => {
  const router = useRouter();
  return (
    <Button
      className="bg-white rounded-md py-1 md:py-2 px-2 md:px-4 w-auto text-xs lg:text-lg font-semibold flex flex-row items-center hover:bg-neutral-300 transition text-black"
      onClick={() => router.push(`/watch/${movieId}`)}
    >
      <BsFillPlayFill size={25} className="mr-1" />
      Play
    </Button>
  );
};

export default PlayButton;
