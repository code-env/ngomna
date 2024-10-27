import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // find all users in the database while excluding the current user
    const users = await db.user.findMany({
      where: {
        NOT: {
          clerkId: userId,
        },
      },
    });

    return new NextResponse(JSON.stringify(users), {
      status: 200,
    });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("An internal server error occured", {
      status: 500,
    });
  }
}
