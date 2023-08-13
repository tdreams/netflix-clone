"use client";
import React, { useEffect, useState } from "react";
import useMovie from "@/hooks/useMovie";
import { Movie } from "@/types";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Link from "next/link";

const Watch = ({ params }: { params: { movieId: string } }) => {
  const [movie, setMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchMovie = async () => {
      const fetchedMovie = await useMovie(params.movieId);
      setMovie(fetchedMovie);
    };

    fetchMovie();
  }, [params.movieId]);

  return (
    <div className="text-white h-screen w-screen bg-black">
      <nav className="fixed w-full p-4 z-10 flex flex-row items-center gap-8 bg-black bg-opacity-70">
        <Link href="/">
          <AiOutlineArrowLeft
            className="text-xl md:text-3xl font-bold cursor-pointer"
            size={40}
          />
        </Link>
        <p>
          Watching:<span className="ml-1 font-light">{movie?.title}</span>
        </p>
      </nav>
      <video
        autoPlay
        controls
        className="h-full w-full"
        src={movie?.videoUrl}
      ></video>
    </div>
  );
};

export default Watch;
