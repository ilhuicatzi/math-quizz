import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/middlewares/AuthOptions";

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const data = await request.json();
    if (!data.area || !data.areaId || !data.abstract || !data.colorTopic) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const newArea = await prisma.curriculum.create({
      data: {
        area: data.area,
        areaId: data.areaId,
        abstract: data.abstract,
        colorTopic: data.colorTopic,
        adminId: parseInt(session.user.id),
      },
    });
    if (!newArea) {
      return NextResponse.json(
        { error: "Error al crear el área" },
        { status: 500 }
      );
    }
    return NextResponse.json(newArea, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear el cuestionario" },
      { status: 500 }
    );
  }
}

