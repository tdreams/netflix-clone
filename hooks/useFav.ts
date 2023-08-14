"use client";

import useSWR from "swr";
import axios from "axios";
import { Movie } from "@/types";

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (Array.isArray(response.data) && response.data.length > 0) {
      const favoriteMovies: Movie[] = response.data;
      return favoriteMovies;
    }
  } catch (e) {
    throw new Error("Error fetching favorite movies");
  }
};

const UseFav = () => {
  const { data, error, isLoading, mutate } = useSWR("/api/favorites", fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
  };
};

export default UseFav;
