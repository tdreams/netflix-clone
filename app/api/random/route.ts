import { currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const user = await currentUser();
    /* console.log(" and currentUser: ", user, user?.id, user?.username); */

    if (!user?.id) {
      return new NextResponse("Unauthorized", {
        status: 401,
      });
    }

    const moviesCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * moviesCount);

    const randomMovie = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });

    if (!randomMovie) {
      return new NextResponse("No movies found", {
        status: 404,
      });
    }

    return new NextResponse(JSON.stringify(randomMovie), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log("[RANDOM_MOVIE]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
