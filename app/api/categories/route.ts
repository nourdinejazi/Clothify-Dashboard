import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";


export async function POST (
    req:Request
){
    try{
        const {userId} = auth()

        const body = await req.json()
        const {name} = body

        if (userId !== process.env.ADMIN) {
            return new NextResponse("Unauthenticated", { status: 403 });
          }

        if (!name){
            return new NextResponse("Name is required" , {status : 400})
        }

        const categories = await prismadb.category.create({
            data : {
                name
            }
        })
        return NextResponse.json(categories)
    }catch(error){
        console.log('[CATEGORIES_POST]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
    
}


export async function GET (
    req:Request
){
    try{
    
        const categories = await prismadb.category.findMany()

        return NextResponse.json(categories)
    }catch(error){
        console.log('[CATEGORIES_GET]', error);
        return new NextResponse("Internal error", { status: 500 });
    }
}