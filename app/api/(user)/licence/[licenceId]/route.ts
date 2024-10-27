import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@clerk/nextjs/server";

export async function GET(req: Request) {
  try {
    const user = await auth();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userInDb = await db.user.findUnique({
      where: {
        clerkId: user.userId as string,
      },
    });

    if (!userInDb) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const licence = await db.carLicence.findUnique({
      where: {
        id: userInDb.id,
      },
    });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("An internal server error occured", {
      status: 500,
    });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { licenceId: string } }
) {
  try {
    const user = await auth();

    const { status } = await req.json();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userInDb = await db.user.findUnique({
      where: {
        clerkId: user.userId as string,
      },
    });

    if (!userInDb) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const licence = await db.carLicence.update({
      where: {
        id: params.licenceId,
      },
      data: {
        status: status,
      },
    });

    if (licence) {
      return new NextResponse("Licence updated", { status: 200 });
    }

    return new NextResponse("Licence updated successfully", { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("An internal server error occured", {
      status: 500,
    });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { licenceId: string } }
) {
  try {
    const user = await auth();

    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const userInDb = await db.user.findUnique({
      where: {
        clerkId: user.userId as string,
      },
    });

    if (!userInDb) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const licence = await db.carLicence.delete({
      where: {
        id: params.licenceId,
      },
    });

    if (licence) {
      return new NextResponse("Licence deleted", { status: 200 });
    }

    return new NextResponse("Licence deleted successfully", { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse("An internal server error occured", {
      status: 500,
    });
  }
}
