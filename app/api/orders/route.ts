


import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
  };
  
  export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
  }



export async function POST (
    req:Request
){
    try{
        const { productIds , formData   } = await req.json();
        console.log(formData)
        if (!productIds || productIds.length === 0) {
          return new NextResponse("Product ids are required", { status: 400 });
        }
      
        const order = await prismadb.order.create({
            data: {
              isPaid: false,
              address : formData.address,
              phone : formData.phone,
              name : formData.name,
              orderItems: {
                create: productIds.map((productId: string) => ({
                  product: {
                    connect: {
                      id: productId
                    }
                  }
                }))
              }
            }
          });

        return NextResponse.json(order, {headers: corsHeaders})
    }catch(error){
        console.log('[ORDERS_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
    
}