import axios from "axios";
import { Movie } from "@/types";

const UseMovie = async (movieId: string | undefined) => {
  try {
    const response = await axios.get(`/api/movies/${movieId}`);
    if (response.status === 200) {
      const movie: Movie = response.data;
      return movie;
    }
  } catch (error) {
    console.error("Error fetching movie details", error);
  }
  return null;
};

export default UseMovie;
