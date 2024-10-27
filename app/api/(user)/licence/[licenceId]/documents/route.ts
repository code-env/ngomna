import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
  { params }: { params: { licenceId: string } }
) {
  try {
    const { name, url } = await req.json();
    const user = await auth();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const createDocument = await db.licence_documents.create({
      data: {
        licenceId: params.licenceId,
        name: name,
        url: url,
      },
    });

    if (createDocument) {
      return new NextResponse("Document created", { status: 201 });
    }

    return new NextResponse(JSON.stringify(createDocument), { status: 201 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}

export async function GET(
  req: Request,
  { params }: { params: { licenceId: string } }
) {
  try {
    const user = await auth();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const documents = await db.licence_documents.findMany({
      where: {
        licenceId: params.licenceId,
      },
    });

    return new NextResponse(JSON.stringify(documents), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("Internal server error", { status: 500 });
  }
}
