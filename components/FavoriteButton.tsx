import React, { useEffect, useState } from "react";
import useAddFavorite from "@/hooks/useAddFavorite";
useAddFavorite;
import { AiOutlinePlus } from "react-icons/ai";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState("");

  const handleAddFavorite = async () => {
    try {
      const result = await useAddFavorite(movieId);
      if (result) {
        console.log("Movie added to favorites", result);
        setIsAdded(true);
      } else {
        console.log("Failed to add movie to favorites");
      }
    } catch (e) {
      setError("Failed to add movie to favorites.Please try again");
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={handleAddFavorite}
          className="rounded-full cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 flex justify-center items-center transition hover:border-neutral-300"
        >
          <AiOutlinePlus className="text-white" size={15} />
        </button>
      </div>
    </div>
  );
};

export default FavoriteButton;
