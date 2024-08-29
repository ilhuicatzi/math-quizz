import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";


export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);

  // Valite data (you can use Joi or Yup here)
  if (
    !data.email ||
    !data.password ||
    !data.username ||
    !data.firstName ||
    !data.lastName
  ) {
    return NextResponse.json(
      { error: "Complete data is required" },
      { status: 400 }
    );
  }

  // Check if the user admin already exists
  const user_exist = await prisma.admin.findMany({
    where: {
      email: data.email,
    },
  });

  if (user_exist.length) {
    return NextResponse.json(
      { error: "The email address is already registered" },
      { status: 409 }
    );
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);

  // Set the user status to true
  data.status = true;

  try {
    // Crear el nuevo usuario
    const user = await prisma.admin.create({ data });
    const { password, ...userWithoutPassword } = user;

    return NextResponse.json(userWithoutPassword, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create user" },
      { status: 500 }
    );
  }
}
