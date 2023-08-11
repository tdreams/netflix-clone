import axios from "axios";
import { Movie } from "@/types";

const FetchRandomMovie = async () => {
  try {
    const response = await axios.get("http://localhost:3000/api/random");
    if (response.data.length > 0) {
      const randomMovie: Movie = response.data[0];
      return randomMovie;
    }
  } catch (e) {
    console.error("Error fetching data", e);
  }
  return null;
};

export default FetchRandomMovie;
