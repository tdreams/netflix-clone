import React, { useEffect, useState } from "react";
import UseAddFavorite from "@/hooks/useAddFavorite";
import UseRemoveFavorite from "@/hooks/useRemoveFavorite";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import useFavorites from "@/hooks/useFavorites";

interface FavoriteButtonProps {
  movieId: string | undefined;
  onFavoriteUpdated?: () => Promise<void>;
}

const FavoriteButton = ({
  movieId,
  onFavoriteUpdated,
}: FavoriteButtonProps) => {
  const [isAdded, setIsAdded] = useState(false);
  const [error, setError] = useState("");

  const CheckIfMovieIsAdded = async () => {
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

  useEffect(() => {
    CheckIfMovieIsAdded();
  }, [movieId]);

  const handleAddFavorite = async () => {
    try {
      if (isAdded) {
        //Remove the movie from favorites
        const remove = await UseRemoveFavorite(movieId);
        if (remove) {
          setIsAdded(false);
          CheckIfMovieIsAdded();
          if (typeof onFavoriteUpdated === "function") {
            await onFavoriteUpdated(); // Trigger update in Favorites component
          }
        } else {
          console.log("Failed to remove movie from favorite");
        }
      } else {
        //Add the movie to favorites
        const add = await UseAddFavorite(movieId);
        if (add) {
          setIsAdded(true);
          CheckIfMovieIsAdded();
          if (typeof onFavoriteUpdated === "function") {
            await onFavoriteUpdated(); // Trigger update in Favorites component
          }
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
