import { NextResponse } from 'next/server';

import prismadb from '@/lib/prismadb';
import { auth } from '@clerk/nextjs';
 
export async function POST(
  req: Request,
) {
  try {
    const { userId } = auth();

    const body = await req.json();

    const { name, value } = body;

    if (userId !== process.env.ADMIN) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!value) {
      return new NextResponse("Value is required", { status: 400 });
    }



    const color = await prismadb.color.create({
      data: {
        name,
        value,
      }
    });
  
    return NextResponse.json(color);
  } catch (error) {
    console.log('[COLORS_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};

export async function GET(
  req: Request,
) {
  try {


    const colors = await prismadb.color.findMany();
  
    return NextResponse.json(colors);
  } catch (error) {
    console.log('[COLORS_GET]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};