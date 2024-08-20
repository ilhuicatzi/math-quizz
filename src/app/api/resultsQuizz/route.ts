import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/lib/AuthOptions";

export async function GET() {
  try {
    // Obtener la sesión actual del usuario
    const session = await getServerSession(authOptions);

    // Verificar si el usuario está autenticado
    if (!session) {
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });
    }

    const userId = parseInt(session.user.id);

    const quizzes = await prisma.quizz.findMany({
      where: {
        estudianteId: userId,
      },
    });

    return NextResponse.json({ quizzes }, { status: 201 });
  } catch (error) {
    console.error(
      "Error al cargar los resultados de los cuestionarios del usuario:",
      error
    );
    return null;
  }
}
