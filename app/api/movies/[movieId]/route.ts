import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(
  req: Request,
  { params }: { params: { movieId: string | undefined } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Missing userId in query parameters", {
        status: 400,
      });
    }

    const movieId = params.movieId;

    if (movieId === undefined) {
      return new NextResponse("Missing movieId in query parameters", {
        status: 400,
      });
    }

    if (typeof movieId !== "string") {
      return new NextResponse("Invalid movieId format", {
        status: 400,
      });
    }

    // Find the user in the database
    const user = await prismadb.user.findUnique({
      where: {
        externalId: userId,
      },
    });

    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }

    // Find the movie in the database
    const movie = await prismadb.movie.findUnique({
      where: {
        id: movieId,
      },
    });

    if (!movie) {
      return new NextResponse("Movie not found", {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(movie), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("[GET_MOVIE_DETAILS]", e);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
