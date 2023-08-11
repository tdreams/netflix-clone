"use client";
import React, { useState, useEffect } from "react";
import FavoriteButton from "./FavoriteButton";
import useFavorites from "@/hooks/useFavorites";
import { Movie } from "@/types";
import { Card, CardContent, CardDescription } from "@/components/ui/card";
import { BsFillPlayFill } from "react-icons/bs";
import { useRouter } from "next/navigation";

interface FavoritesProps {
  title: string;
}

const Favorites = ({ title }: FavoritesProps) => {
  const router = useRouter();
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);

  useEffect(() => {
    const fetchFavoriteMovies = async () => {
      const favoriteMoviesList = await useFavorites();
      setFavoriteMovies([...favoriteMoviesList]);
    };

    fetchFavoriteMovies();
  }, [favoriteMovies]);
  //console.log("Favorite Movies Array:", favoriteMovies);
  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div className="text-white text-base md:text-xl lg:text-2xl font-semibold">
        <p>{title}</p>
      </div>
      <div className="grid grid-cols-4 gap-2">
        {favoriteMovies.length > 0 ? (
          favoriteMovies.map((movie) => (
            <Card
              key={movie.id}
              className=" bg-zinc-900 col-span-1 h-[12vw] relative  group border-0 transition-transform duration-300 "
            >
              <img
                src={movie.thumbnailUrl}
                alt="Thumbnail"
                className="w-full h-full object-cover cursor-pointer transition duration-0 shadow-xl group-hover:opacity-0 sm:group-hover:opacity-0 delay-300 rounded-md"
              />
              <div className="opacity-0 absolute top-0 transition duration-300 z-10 invisible sm:visible delay-300 w-full scale-0 group-hover:scale-110 group-hover:-translate-y-[6vw] group-hover:translate-x-[2vw] group-hover:opacity-100 ">
                <img
                  src={movie.thumbnailUrl}
                  alt="Thumbnail"
                  className="cursor-pointer object-cover transition duration shadow-xl rounded-t-md w-full h-[12vw]"
                />
                <CardContent className="z-10 bg-zinc-800 p-2 lg:p-4 absolute w-full transition shadow-md rounded-b-md">
                  <div className="flex flex-row items-center gap-3">
                    <div
                      className="cursor-pointer w-6 h-6 lg:w-10 lg:h-10 bg-white rounded-full flex justify-center items-center transition hover:bg-neutral-300"
                      onClick={() => {
                        router.push(`/watch/${movie?.id}`);
                      }}
                    >
                      <BsFillPlayFill size={20} />
                    </div>
                    <FavoriteButton movieId={movie?.id} />
                  </div>
                  <p className="text-red-400 font-semibold mt-4">
                    New <span className="text-white">2023</span>
                  </p>
                  <div>
                    <p className="text-white text-[10px] lg:text-sm">
                      {movie.duration}
                    </p>
                    <p className="text-white text-[10px] lg:text-sm">
                      {movie.genre}
                    </p>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))
        ) : (
          <p>No favorite movies added yet.</p>
        )}
      </div>
    </div>
  );
};

export default Favorites;
