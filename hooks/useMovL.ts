import useSWR from "swr";
import axios from "axios";
import { Movie } from "@/types";

const fetcher = async (url: string) => {
  try {
    const response = await axios.get(url);
    if (response.data.length > 0) {
      const movies: Movie[] = response.data;
      return movies;
    }
  } catch (e) {
    throw new Error("Error fetching data");
  }
};

const FetchMov = () => {
  const { data, error, isLoading } = useSWR("/api/movies", fetcher);
  return {
    data,
    error,
    isLoading,
  };
};

export default FetchMov;
