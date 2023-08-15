import React from "react";

import { Movie } from "@/types";
import MovieCard from "@/components/MovieCard";
import { isEmpty } from "lodash";
import { Skeleton } from "./ui/skeleton";

interface MovieListProps {
  data: Movie[];
  title: string;
  isLoading: boolean;
}

const MovieList: React.FC<MovieListProps> = ({ data, title, isLoading }) => {
  if (isEmpty(data)) {
    return null;
  }

  if (isLoading) {
    return <Skeleton className=" h-[12vw] brightness-[60%]" />;
  }

  return (
    <div className="px-4 md:px-12 mt-4 space-y-8">
      <div>
        <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
          {title}
        </p>
        <div className="grid grid-cols-4 gap-2">
          {data.map((movie) => (
            <MovieCard key={movie.id} data={movie} isLoading={isLoading} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MovieList;
