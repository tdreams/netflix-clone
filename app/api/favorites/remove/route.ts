import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

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
      return new NextResponse("Invalid Movie ID", {
        status: 400,
      });
    }

    const user = await prismadb.user.findUnique({
      where: {
        externalId: userId,
      },
      include: {
        favoriteMovies: {
          where: {
            movieId,
          },
        },
      },
    });
    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }

    if (user.favoriteMovies.length === 0) {
      return new NextResponse("Movie not found in user's favorites", {
        status: 400,
      });
    }

    // Remove the relation between the user and the movie in UserMovie model
    const remove = await prismadb.userMovie.delete({
      where: {
        id: user.favoriteMovies[0].id, // Assuming there's only one relation entry per movie
      },
    });

    return new NextResponse(JSON.stringify(remove), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("[REMOVE_FAVORITE_MOVIE]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
