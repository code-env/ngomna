import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const { paymentdata } = await req.json();

    if (!paymentdata) {
      return new NextResponse("Unauthorized webhook call", { status: 400 });
    }

    const createSubscription = await db.subscriptions.create({
      data: {
        userId: paymentdata.userId,
        tx_ref: paymentdata.tx_ref,
        amountpaid: paymentdata.amountpaid,
        lastpaymentdate: new Date(paymentdata.lastpaymentdate),
        nextpaymentdate: new Date(paymentdata.nextpaymentdate),
        daysfromlastpaycount: 0,
  
      }

    });

    if (!createSubscription) {
      return new NextResponse("Subscription creation failed", { status: 400 });
    }
    

    return new NextResponse(JSON.stringify(createSubscription), { status: 200 });
  } catch (error: any) {
    console.log(error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}