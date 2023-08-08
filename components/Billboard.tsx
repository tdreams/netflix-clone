"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";

interface Movie {
  id: string;
  title: string;
  description: string;
  videoUrl: string;
  thumbnailUrl: string;
  genre: string;
  duration: string;
}

const Billboard = () => {
  const [randomMovie, setRandomMovie] = useState<Movie | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchRandomMovie = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/random");
        /* console.log("API Response:", response.data); */
        if (response.data.length > 0) {
          setRandomMovie(response.data[0]); // Get the first movie from the array
          setIsLoading(false);
        } else {
          setIsLoading(false);
          setIsError(true);
        }
      } catch (e) {
        console.error("Error fetching data:", e);
        setIsLoading(false);
        setIsError(true);
      }
    };
    fetchRandomMovie();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error loading data</p>;
  }
  return (
    <div className="text-white absolute top-24 left-10">
      <h1>Billboard</h1>
      {randomMovie && (
        <div>
          <h2 className="text-white">{randomMovie.title}</h2>
          <p>Description:{randomMovie.description}</p>
          <p>Genre: {randomMovie.genre}</p>
          <p>Duration: {randomMovie.duration}</p>
        </div>
      )}
    </div>
  );
};

export default Billboard;
