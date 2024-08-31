import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/middlewares/AuthOptions";

const questionName = [
  { id: 1, name: "Pregunta 1", value: "quizz1" },
  { id: 2, name: "Pregunta 2", value: "quizz2" },
  { id: 3, name: "Pregunta 3", value: "quizz3" },
  { id: 4, name: "Pregunta 4", value: "quizz4" },
  { id: 5, name: "Pregunta 5", value: "quizz5" },
];

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    if (!session)
      return NextResponse.json({ error: "No autorizado" }, { status: 401 });

    const data = await request.json();
    if (
      !data.questionTitle ||
      !data.question ||
      !data.issue ||
      !data.option1 ||
      !data.option2 ||
      !data.option3 ||
      !data.option4 ||
      !data.correct
    ) {
      return NextResponse.json({ error: "Datos incompletos" }, { status: 400 });
    }

    const resultTitle =
      questionName.find((question) => question.value === data.questionTitle)
        ?.name || "Pregunta";
    const findIdTopic = await prisma.topics.findFirst({
      where: {
        topicId: data.issue,
      },
    });
    if (!findIdTopic) {
      return NextResponse.json(
        { error: "Tema no encontrado" },
        { status: 404 }
      );
    }

    const newQuestion = await prisma.questionTopic.create({
      data: {
        questionTitle: resultTitle,
        questionId: data.questionTitle,
        question: data.question,
        issue: findIdTopic.topic,
        topicId: findIdTopic.id,
      },
    });

    if (!newQuestion) {
      return NextResponse.json(
        { error: "Error al crear la pregunta" },
        { status: 500 }
      );
    }

    const optionsReferens = [
      {
        optionId: "r1",
        option: data.option1,
        correct: false,
        label: "A",
        color: "bg-teal-600",
      },
      {
        optionId: "r2",
        option: data.option2,
        correct: false,
        label: "B",
        color: "bg-rose-600",
      },
      {
        optionId: "r3",
        option: data.option3,
        correct: false,
        label: "C",
        color: "bg-violet-600",
      },
      {
        optionId: "r4",
        option: data.option4,
        correct: false,
        label: "D",
        color: "bg-orange-600",
      },
    ];
    const optionsSavePrisma = optionsReferens.map((option) => ({
      ...option,
      questionId: newQuestion.id,
    }));

    const newOptions = await prisma.optionQuestion.createMany({
      data: optionsSavePrisma,
    });

    if (!newOptions) {
      return NextResponse.json(
        { error: "Error al crear las opciones" },
        { status: 500 }
      );
    }

    const findOptionCorrect = await prisma.optionQuestion.findFirst({
        where: {
            questionId: newQuestion.id,
            optionId: data.correct,
        },
        });

    if (!findOptionCorrect) {
        return NextResponse.json(
            { error: "Opción correcta no encontrada" },
            { status: 404 }
        );
        }

    const updateOptionCorrect = await prisma.optionQuestion.update({
        where: {
            id: findOptionCorrect.id,
        },
        data: {
            correct: true,
        },
    });

    const response = {
      question: newQuestion,
      optionsCorrect: updateOptionCorrect,
    };

    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error al crear el cuestionario" },
      { status: 500 }
    );
  }
}
