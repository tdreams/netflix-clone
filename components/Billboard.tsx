"use client";

import React, { useState, useEffect } from "react";
import fetchRandomMovie from "@/hooks/useBillboard";
import { Movie } from "@/types";
import { Button } from "./ui/button";
import { AiOutlineInfoCircle } from "react-icons/ai";

const Billboard = () => {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const movie = await fetchRandomMovie();
      if (movie) {
        setRandomMovie(movie);
      } else {
        setIsError(true);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }
  return (
    <div className="relative h-[56.25vw]">
      {randomMovie && (
        <div>
          <video
            className="w-full h-[56.25vw] object-cover brightness-[60%]"
            autoPlay
            muted
            loop
            poster={randomMovie?.thumbnailUrl}
            src={randomMovie?.videoUrl}
          ></video>
          <div className="absolute top-[30%] ml-4 md:ml-16">
            <p className="text-white text-xl md:text-5xl h-full w-[50%] lg:text-6xl font-bold drop-shadow-xl">
              {randomMovie?.title}
            </p>
            <p className="text-white text-[8px] md:text-lg mt-3 md:mt-8 w-[90%] md:w-[80%]lg:w-[50%] drop-shadow-xl">
              {randomMovie?.description}
            </p>
            <div className="mt-3 md:mt-4 gap-3">
              <Button className="text-white bg-white/30 hover:bg-white/20 transition md:py-2 md:px-4">
                <AiOutlineInfoCircle className="mr-1" />
                More Info
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Billboard;