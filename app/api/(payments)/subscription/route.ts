import { NextResponse } from "next/server";
import axios from "axios"
import {db} from "@/lib/db"
import { checkCustomRoutes } from "next/dist/lib/load-custom-routes";

export async function POST(req:Request){

    try {

        const {userId, email} = await req.json()

        if (!userId || !email){
            return new NextResponse("Please provide a user id", {status:400})
        }

        const pay = await CheckoutWithFlutter(userId,email)

        
        return new NextResponse(JSON.stringify(pay), {status:200})
    } catch (error:any) {
        return NextResponse.json({error:error.message}, {status:500})
        
    }
}


async function CheckoutWithFlutter(userId:string, email:string){


    const headers = {
        Authorization: `Bearer ${process.env.SECRET_KEY}`,
        "Content-Type": "application/json"
    }

    const txt_refs = crypto.randomUUID().toString()


    // const gettemplate = await db.template.findUnique({
    //     where:{
    //         id:templateId
    //     }
    // })

    // const data = {
    //     amount: gettemplate?.price || 29,
    //     email: "email",
    //     id: "59403jt",
    //     tx_ref: txt_refs,
    //     currency: "XAF",
    //     country: "CM",
    //     customertoken: "dfgdfgd",
    //     fullname: "fullname",
    //     phone_number: 4549854,
    //     redirect_url: "https://www.google.com", //this should be the url to redirect to after payment
    // }


    try {

         const paymentrequest = await axios.post(
    'https://api.flutterwave.com/v3/payments',
    {
      tx_ref: txt_refs,
      amount: 5000,
      currency: 'XAF',
      redirect_url: 'https://example_company.com/success',
      customer: {
        email: email,
        name: userId,
        phonenumber: '09012345678'
      },
      customizations: {
        title: 'Monthly Subscription',
      }
    },
    {
      headers: {
        Authorization: `Bearer ${process.env.FLW_SECRET_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

        
       if (paymentrequest.status === 200){
        const createinitiatedpayement = await db.initiatePayment.create({

            data:{
                userId: userId,
                txRef: txt_refs,
                amount: 5000,
              status: "pending",
            }
        })

        if (!createinitiatedpayement){
            return new NextResponse("An error occured while processing the payment", { status: 500 })
        }

        return paymentrequest.data
       
      }
    }
    

    catch (error: any){
        console.log(error)
        return new NextResponse("An error occured while processing the payment", { status: 500 })
    }


}