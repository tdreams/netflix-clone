import React, { useEffect, useState } from "react";
import useAddFavorite from "@/hooks/useAddFavorite";
import useRemoveFavorite from "@/hooks/useRemoveFavorite";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string;
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const checkIfMovieIsAdded = async () => {
      try {
        const favoritesMovies = await useFavorites();
        const isMovieInFavorites = favoritesMovies.some(
          (movie) => movie.id === movieId
        );
        setIsAdded(isMovieInFavorites);
      } catch (e) {
        console.error("Error checking favorites movies", e);
      }
    };
    checkIfMovieIsAdded();
  }, [movieId]);

  const handleAddFavorite = async () => {
    try {
      if (isAdded) {
        //Remove the movie from favorites
        const remove = await useRemoveFavorite(movieId);
        if (remove) {
          setIsAdded(false);
        } else {
          console.log("Failed to remove movie from favorite");
        }
      } else {
        //Add the movie to favorites
        const add = await useAddFavorite(movieId);
        if (add) {
          setIsAdded(true);
        } else {
          console.log("Failed to add movie to favorite");
        }
      }
    } catch (e) {
      setError(
        isAdded
          ? "Failed to remove movie from favorites"
          : "Failed to add movie to favorites"
      );
    }
  };

  return (
    <div>
      <div>
        <button
          onClick={handleAddFavorite}
          className="rounded-full cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 flex justify-center items-center transition hover:border-neutral-300"
        >
          {isAdded ? (
            <AiOutlineCheck className="text-white" size={15} />
          ) : (
            <AiOutlinePlus className="text-white" size={15} />
          )}
        </button>
      </div>
    </div>
  );
};

export default FavoriteButton;
