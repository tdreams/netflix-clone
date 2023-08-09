import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { without } from "lodash";

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();
    const userCurrent = await currentUser();
    if (!userId || !userCurrent) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    // Parse the request body by reading it as JSON
    const requestBody = await req.json();
    const { movieId } = requestBody;

    const existingMovie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!existingMovie) {
      throw new Error("invalid ID");
    }

    const user = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!user) {
      throw new Error("User not found");
    }

    // Remove the selected movie ID from the favorite list
    const updatedFavoriteIds = without(user.favoriteMovieIds, movieId);
    // Update the user's record with the modified favorite list
    const updatedUser = await prismadb.user.update({
      where: { id: userId },
      data: {
        favoriteMovieIds: updatedFavoriteIds,
      },
    });
    return NextResponse.json(updatedUser);
  } catch (e) {
    console.error("[REMOVE_FAVORITE_MOVIE]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
