import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export async function POST(request: Request, response: Response) {
  const data = await request.json();
  console.log(data);

  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt); 

  const user = await prisma.user.create({data});

  const { password, ...userWithoutPassword } = user;

  return NextResponse.json(userWithoutPassword, { status: 201 });
}