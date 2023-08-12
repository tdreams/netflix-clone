import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request) {
  try {
    const { userId } = auth();
    const user = await currentUser();
    if (!userId || !user) {
      return new NextResponse("Unauthorized", {
        status: 401,
        headers: {
          "Access-Control-Allow-Origin":
            "https://netflix-clone-3u9k5cqgh-tdreams.vercel.app",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "Content-Type": "application/json",
        },
      });
    }

    const movies = await prismadb.movie.findMany();
    if (!movies) {
      return new NextResponse("No movies found", {
        status: 404,
        headers: {
          "Access-Control-Allow-Origin":
            "https://netflix-clone-3u9k5cqgh-tdreams.vercel.app",
          "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
          "Content-Type": "application/json",
        },
      });
    }

    return new NextResponse(JSON.stringify(movies), {
      status: 200,
      headers: {
        "Access-Control-Allow-Origin":
          "https://netflix-clone-3u9k5cqgh-tdreams.vercel.app",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("[MOVIES]", e);
    return new NextResponse("Internal Error", {
      status: 500,
      headers: {
        "Access-Control-Allow-Origin":
          "https://netflix-clone-3u9k5cqgh-tdreams.vercel.app",
        "Access-Control-Allow-Methods": "GET, HEAD, OPTIONS",
        "Content-Type": "application/json",
      },
    });
  }
}
