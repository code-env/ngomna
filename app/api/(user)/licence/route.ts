import { db } from '@/lib/db';
import { auth } from '@clerk/nextjs/server';

import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const user = await auth();

    const { cardId, status } = await req.json();

    if (!user) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const userInDb = await db.user.findUnique({
      where: {
        clerkId: user.userId as string,
      },
    });

    if (!userInDb) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const createlicence = await db.carLicence.create({
      data: {
        userId: userInDb.id,
        carId: cardId,
        status: status,
      },
    });

    if (createlicence) {
      return new NextResponse('Licence created', { status: 201 });
    }

    return new NextResponse('Elctronci licence created successfully', {
      status: 201,
    });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse('An internal server error occured', {
      status: 500,
    });
  }
}

export async function GET(req: Request) {
  try {
    const user = await auth();

    if (!user) {
      return new NextResponse('Unathorized', { status: 401 });
    }

    const userInDb = await db.user.findUnique({
      where: {
        clerkId: user.userId as string,
      },
    });

    if (!userInDb) {
      return new NextResponse('Unauthorized', { status: 401 });
    }

    const licence = await db.carLicence.findMany({
      where: {
        userId: userInDb.id,
      },
    });

    if (!licence) {
      return new NextResponse('No licence found', { status: 404 });
    }
    return new NextResponse(JSON.stringify(licence), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return new NextResponse('An internal server error occured', {
      status: 500,
    });
  }
}
