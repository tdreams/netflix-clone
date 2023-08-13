import axios from "axios";

const UseRemoveFavorite = async (movieId: string | undefined) => {
  try {
    const response = await axios.post("/api/favorites/remove", {
      data: { movieId },
    });
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.error("Error adding favorite movie", e);
  }
  return null;
};

export default UseRemoveFavorite;
