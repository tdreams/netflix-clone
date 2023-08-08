/* import { NextApiRequest, NextApiResponse } from "next";
import { currentUser } from "@clerk/nextjs";
import prismadb from "@/lib/prismadb";

export default async function handlers(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).end();
  }
  try {
    const user = await currentUser();
    const movieCount = await prismadb.movie.count();
    const randomIndex = Math.floor(Math.random() * movieCount);

    const randomMovie = await prismadb.movie.findMany({
      take: 1,
      skip: randomIndex,
    });
    if (!user || !user.firstName || !user.id) {
      return res.status(401).end();
    }
    return res.status(200).json(randomMovie[0]);
  } catch (e) {
    console.log(e);
    return res.status(400).end();
  }
}
 */

import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user) {
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
