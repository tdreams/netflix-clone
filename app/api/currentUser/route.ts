import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET() {
  try {
    const { userId } = auth();

    const user = await prismadb.user.findUnique({
      where: {
        externalId: userId || "",
      },
    });

    return new NextResponse(JSON.stringify(user), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.log("[CURRENT_USER]", e);
    return new NextResponse("Internal Error", { status: 500 });
  }
}
