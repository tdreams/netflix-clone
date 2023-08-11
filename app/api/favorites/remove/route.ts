import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";

export async function DELETE(req: Request) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Missing userId in query parameters", {
        status: 400,
      });
    }
    const requestBody = await req.json();
    const { movieId } = requestBody;

    if (!movieId) {
      return new NextResponse("Missing movieId in request body", {
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

    // Find the UserMovie entry to remove
    const existingUserMovie = await prismadb.userMovie.findFirst({
      where: {
        userId: user.id,
        movieId,
      },
    });

    if (!existingUserMovie) {
      return new NextResponse("UserMovie not found", {
        status: 404,
      });
    }

    // Delete the UserMovie entry
    const remove = await prismadb.userMovie.delete({
      where: {
        id: existingUserMovie.id,
      },
    });

    return NextResponse.json(remove);
  } catch (e) {
    console.error("[REMOVE_FAVORITE]", e);
    return new NextResponse("Internal Error", {
      status: 500,
    });
  }
}
