import axios from "axios";
import { Movie } from "@/types";

const FetchMovies = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/movies");
    if (response.data.length > 0) {
      const movies: Movie[] = response.data;
      return movies;
    }
  } catch (e) {
    console.error("Error fetching data", e);
  }
  return null;
};

export default FetchMovies;
