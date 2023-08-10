import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function GET(req: Request) {
  try {
    // Get the userId from the request query
    /* const queryParams = new URLSearchParams(req.url.split("?")[1]);
    const userId = queryParams.get("userId"); */

    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Missing userId in query parameters", {
        status: 400,
      });
    }

    // Find the user in the database
    const user = await prismadb.user.findUnique({
      where: {
        externalId: userId,
      },
      include: {
        favoriteMovies: {
          include: {
            movie: true, // Include the related movie
          },
        },
      },
    });

    if (!user) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }

    const favoriteMovies = user.favoriteMovies.map(
      (userMovie) => userMovie.movie
    );

    return NextResponse.json(favoriteMovies, {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("[GET_FAVORITES]", e);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
