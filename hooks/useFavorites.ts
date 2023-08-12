import axios from "axios";
import { Movie } from "@/types";
import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

const UseFavorites = async () => {
  try {
    const user = await currentUser();
    if (!user) {
      return new NextResponse("Missing userId in query parameters", {
        status: 400,
      });
    }
    const response = await axios.get("http://localhost:3000/api/favorites");
    console.log("list Favorites", response.data);
    if (Array.isArray(response.data) && response.data.length > 0) {
      const favoriteMovies: Movie[] = response.data;
      return favoriteMovies;
    }
  } catch (e) {
    console.error("Error fetching favorite movies", e);
  }
  return [];
};

export default UseFavorites;
