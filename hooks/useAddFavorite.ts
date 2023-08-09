import axios from "axios";

const useAddFavorite = async (movieId: string) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/api/favorites/add",
      {
        movieId,
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

export default useAddFavorite;
