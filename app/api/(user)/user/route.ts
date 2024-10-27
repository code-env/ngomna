import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  return new NextResponse("This sapi is still under developement");
}
