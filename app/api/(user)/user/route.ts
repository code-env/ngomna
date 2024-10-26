import {NextResponse} from  "next/server"
import { auth } from "@clerk/nextjs/server"
import { db } from "@/lib/db"


export async function GET() {
    try {
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Unauthorized!", {
                status: 400
            })
        }

        const user = await db.user.findUnique({
            where: {
               clerkId: userId
            }
        })

        if (user) {
            return NextResponse.json(user)
        }

        return new NextResponse("User not found!", {
            status: 404
        })
    } catch (error: any) {
        console.log("ERROR WHILE GETTING POST", error.message);
        return new NextResponse("Internal server error", {
            status: 500,
        });
    }
}