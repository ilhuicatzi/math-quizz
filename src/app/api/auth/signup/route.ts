import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";


export async function POST(request: Request) {
  const data = await request.json();
  console.log(data);

  // Validar datos (puedes usar Joi o Yup aquí)
  if (
    !data.email ||
    !data.password ||
    !data.username ||
    !data.nivel ||
    !data.nombre ||
    !data.apellido
  ) {
    return NextResponse.json(
      { error: "Complete data is required" },
      { status: 400 }
    );
  }

  // Verificar si el usuario ya existe
  const user_exist = await prisma.user.findMany({
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

  // Hashear la contraseña
  const salt = await bcrypt.genSalt(10);
  data.password = await bcrypt.hash(data.password, salt);

  // Agregar la organización por defecto
  data.organizacion = "none";

  try {
    // Crear el nuevo usuario
    const user = await prisma.user.create({ data });
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
