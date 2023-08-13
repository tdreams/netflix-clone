import { Movie } from "@/types";

const FetchRandomMovie = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/random");
    const data = await response.json();

    if (data.length > 0) {
      const randomMovie: Movie = data[0];
      return randomMovie;
    }
  } catch (e) {
    console.error("Error fetching data", e);
  }
  return null;
};

export default FetchRandomMovie;
