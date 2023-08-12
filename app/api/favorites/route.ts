import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth, currentUser } from "@clerk/nextjs";

export async function GET(req: Request) {
  try {
    // Get the userId from the request query
    /* const queryParams = new URLSearchParams(req.url.split("?")[1]);
    const userId = queryParams.get("userId"); */

    const user = await currentUser();

    if (!user) {
      return new NextResponse("Missing userId in query parameters", {
        status: 400,
      });
    }

    // Find the user in the database
    const userdb = await prismadb.user.findUnique({
      where: {
        externalId: user.id,
      },
      include: {
        favoriteMovies: {
          include: {
            movie: true, // Include the related movie
          },
        },
      },
    });

    if (!userdb) {
      return new NextResponse("User not found", {
        status: 404,
      });
    }

    const favoriteMovies = userdb.favoriteMovies.map(
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
