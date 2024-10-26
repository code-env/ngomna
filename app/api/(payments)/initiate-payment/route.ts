import { db } from '@/lib/db';

import { NextResponse } from 'next/server';

export async function GET(
  req: Request,
  { params }: { params: { userId: string } }
) {
  try {
    const doesuserexist = await db.user.findUnique({
      where: {
        id: params.userId,
      },
    });

    if (!doesuserexist) {
      return new NextResponse('User does not exist', { status: 404 });
    }

    const txt_refs = crypto.randomUUID().toString();

    const initiatepay = await db.initiatePayment.create({
      data: {
        userId: params.userId,
        txRef: txt_refs,
        amount: 5000,
      },
    });

    if (!initiatepay) {
      return new NextResponse('An error occured while initiating payment', {
        status: 500,
      });
    }

    return new NextResponse(JSON.stringify(initiatepay), { status: 200 });
  } catch (error: any) {
    return new NextResponse(JSON.stringify(error.message), { status: 500 });
  }
}
