import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function POST(req: Request) {
  try {
    // Parse the request body by reading it as JSON
    const requestBody = await req.json();
    const { movieId } = requestBody;

    // Check if the movie with the given ID exists
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

    // Get the userId from Clerk auth
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    // Get the user's _id from the database using userId
    const user = await prismadb.user.findFirst({
      where: {
        externalId: userId,
      },
    });

    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }

    // Check if the user has already added the movie to favorites
    const existingUserMovie = await prismadb.userMovie.findFirst({
      where: {
        userId: user.id,
        movieId,
      },
    });

    if (existingUserMovie) {
      return new NextResponse("Movie already in favorites", {
        status: 400,
      });
    }

    // Create a new UserMovie entry to represent the favorite relationship
    const userMovie = await prismadb.userMovie.create({
      data: {
        userId: user.id,
        movieId,
      },
    });

    return NextResponse.json(userMovie);
  } catch (e) {
    console.error("[ADD_FAVORITES]", e);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
