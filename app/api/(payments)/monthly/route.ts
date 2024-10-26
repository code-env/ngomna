
import { db } from "@/lib/db";
import { SubscriptionPlan } from "@prisma/client";
import { NextResponse } from "next/server";


export async function GET(req:Request, {params}:{params:{userId:string}}){


    const {userId} = params


    try {

        if(!userId){
            return new NextResponse("Please provide a user id", {status:400})
        }

        const subscriptionstatus = await checksubscriptionstatus(userId)

        return new NextResponse(JSON.stringify(subscriptionstatus), {status:200})
        

    } catch (error:any) {
        console.log(error.message)
        return new NextResponse(error.message, {status:500})
        
    }

}

async function checksubscriptionstatus(userId:string){
    const recentsubscription = await db.subscriptions.findFirst({
        where:{
            userId:userId
        },
        orderBy:{
            createdAt:"desc"
        }
    })

    if(!recentsubscription){

        const checkfreesubscriptionplan = await db.user.findUnique(
            {
                where:{
                    id:userId
                }
            }
        )

        if (checkfreesubscriptionplan?.payment === SubscriptionPlan.FREE) {
            const userCreatedAt = new Date(checkfreesubscriptionplan?.createdAt); 
            const currentDate = new Date();
        
            
            const freePlanExpiryDate = new Date(userCreatedAt);
            freePlanExpiryDate.setDate(freePlanExpiryDate.getDate() + 5);
        
           
            console.log("Free plan expiry date", freePlanExpiryDate)
            if (currentDate.getTime() < freePlanExpiryDate.getTime()) {
                return { issubscriptionfinished: false, expiringdate: freePlanExpiryDate.toLocaleDateString() };
            }
        }

        console.log("No subscription found")

      const p=   await db.user.update({
            where:{
                id:userId
            },
            data:{
                payment:SubscriptionPlan.NOTPAID
            }
        })

        console.log("Updated user", p)

        return { issubscriptionfinished:true, expiringdate: null}
    }
    
    const hasCurrentSubscriptionFinished = new Date(recentsubscription.nextpaymentdate).getTime() < new Date().getTime()


    if(hasCurrentSubscriptionFinished){
       await db.user.update({
            where:{
                id:userId
            },
            data:{
                payment:SubscriptionPlan.NOTPAID
       }
    }
    )
    }

    // console.log('Has subscription finished', hasCurrentSubscriptionFinished)

    return { issubscriptionfinished: hasCurrentSubscriptionFinished, expiringdate: recentsubscription.nextpaymentdate.toLocaleDateString()}

}