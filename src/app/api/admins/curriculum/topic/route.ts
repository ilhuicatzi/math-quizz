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
    if (!data.topic || !data.topicId || !data.duration || !data.colorTopic || !data.description || !data.path || !data.branch) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    //buscar el area
    const area = await prisma.curriculum.findFirst({
        where: {
            areaId: data.branch,
        },
        });
    if (!area) {
        return NextResponse.json({ error: "No se encontró el área" }, { status: 404 });
    }

    console.log(area);

    const newTopic = await prisma.topics.create({
        data: {
            topicId: data.topicId,
            topic: data.topic,
            duration: data.duration,
            colorTopic: data.colorTopic,
            description: data.description,
            path: data.path,
            branch: data.branch,
            curriculumId: area.id,
        },
    });

    if (!newTopic) {
        return NextResponse.json({ error: "Error al crear el tema" }, { status: 500 });
    }

    return NextResponse.json(newTopic, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear el cuestionario" },
      { status: 500 }
    );
  }
}

