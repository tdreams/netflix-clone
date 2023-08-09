import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }
    const user = await prismadb.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new Error("user not found");
    }

    const favoriteMovieIds = user.favoriteMovieIds;

    const favoriteMovies = await prismadb.movie.findMany({
      where: {
        id: {
          in: favoriteMovieIds,
        },
      },
    });
    return new NextResponse(JSON.stringify(favoriteMovies), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("[GET_FAVORITE_MOVIES]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
