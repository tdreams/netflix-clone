import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
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

    const user = await prismadb.user.update({
      where: { id: userId },
      data: {
        favoriteMovieIds: { push: movieId },
      },
    });
    return NextResponse.json(user);
  } catch (e) {
    console.log("[ADD_FAVORITES]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
