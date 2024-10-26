import { db } from "@/lib/db";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";

export async function GET(req:Request, {params}:{params:{licenceId:string}}){
    try {

        const user = await auth()

        if (!user){
            return new NextResponse("Unauthorized", {status:401})
        }

        const documents = await db.licence_documents.findMany({
            where:{
                licenceId:params.licenceId
            }
        })

        return new NextResponse(JSON.stringify(documents), {status:200})
        
    } catch (error:any) {
        console.error(error.message)
        return new NextResponse("An internal server error occured", {status:500})
        
    }
}