import axios from "axios";

const UseAddFavorite = async (movieId: string | undefined) => {
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

export default UseAddFavorite;
