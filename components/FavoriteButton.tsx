"use client";
import axios from "axios";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import React, { useCallback, useMemo } from "react";
import UseFav from "@/hooks/useFav";
import UseCurrentUser from "@/hooks/useCurrentUser";

interface FavoriteButtonProps {
  movieId: string | undefined;
}

const FavoriteButton = ({ movieId }: FavoriteButtonProps) => {
  const { data: favoriteMovies, mutate: mutateFavorites } = UseFav();
  const { data: currentUser, mutate } = UseCurrentUser();

  const isMovieInFavorite = favoriteMovies?.some(
    (movie) => movie.id === movieId
  );

  const toggleFavorites = useCallback(async () => {
    let response;
    if (isMovieInFavorite) {
      response = await axios.delete("/api/favorites/remove", {
        data: { movieId },
      });
    } else {
      response = await axios.post("/api/favorites/add", {
        movieId,
      });
    }

    const updateFavoriteIds = response?.data.favoriteMovies;

    mutate({
      ...currentUser,
      favoriteMovies: updateFavoriteIds,
    });
    mutateFavorites();
  }, [movieId, isMovieInFavorite, currentUser, mutate, mutateFavorites]);

  const Icon = isMovieInFavorite ? AiOutlineCheck : AiOutlinePlus;
  return (
    <div
      onClick={toggleFavorites}
      className="cursor-pointer group/item w-6 h-6 lg:w-10 lg:h-10 border-white border-2 rounded-full flex justify-center items-center transition hover:border-neutral-300"
    >
      <Icon className="text-white group-hover/item:text-neutral-300 w-4 lg:w-6" />
    </div>
  );
};

export default FavoriteButton;
