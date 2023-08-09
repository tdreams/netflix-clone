import axios from "axios";

const useRemoveFavorite = async (movieId: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/favorites/remove",
      {
        data: { movieId },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
  } catch (e) {
    console.error("Error adding favorite movie", e);
  }
  return null;
};

export default useRemoveFavorite;
