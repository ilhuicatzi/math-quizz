import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../auth/[...nextauth]/route';
import { AritmeticaQuestions } from '@/lib/AritmeticaQuestions';
import { AlgebraQuestions } from '@/lib/AlgebraQuestions';


export async function POST(request: Request) {
  try {
    // Obtener la sesión actual del usuario
    const session = await getServerSession(authOptions);
    
    // Verificar si el usuario está autenticado
    if (!session) {
      return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
    }

    // Parsear los datos de la solicitud
    const data = await request.json();
    console.log(data);

    // Validar los datos recibidos
    if (!data.titulo || !data.respuestas) {
      console.log(data.titulo)
      return NextResponse.json({ error: 'Datos incompletos' }, { status: 400 });
    }

    // Obtener las respuestas correctas del cuestionario
    let correctAnswers;
    if (data.titulo === 'Aritmética') {
      correctAnswers = AritmeticaQuestions.map((question) => question.correctAnswer);
    } else if (data.titulo === 'Álgebra') {
      correctAnswers = AlgebraQuestions.map((question) => question.correctAnswer);
    } else {
      return NextResponse.json({ error: 'Título de cuestionario inválido' }, { status: 400 });
    }

    const { respuestas } = data;
    const userAnswers = [
      respuestas.question1, respuestas.question2, respuestas.question3,
      respuestas.question4, respuestas.question5, respuestas.question6,
      respuestas.question7, respuestas.question8, respuestas.question9,
      respuestas.question10
    ];

    const requiredQuestions = [
      'question1', 'question2', 'question3', 'question4', 'question5',
      'question6', 'question7', 'question8', 'question9', 'question10'
    ];

    // Validar que todas las respuestas están presentes
    for (const question of requiredQuestions) {
      if (!respuestas.hasOwnProperty(question)) {
        return NextResponse.json({ error: `Falta la respuesta para ${question}` }, { status: 400 });
      }
    }

    // Calcular la calificación comparando respuestas
    let score = 0;
    const totalQuestions = correctAnswers.length;
    console.log(userAnswers, correctAnswers)

    userAnswers.forEach((answer, index) => {
      if (answer === correctAnswers[index]) {
        score += 1;
      }
    });

    const calificacion = (score / totalQuestions) * 10; // Calificación sobre 10

    // Crear un nuevo cuestionario
    const newQuiz = await prisma.quizz.create({
      data: {
        titulo: data.titulo,
        estudiante: {
          connect: {
            id: parseInt(session.user.id),
          },
        },
        calificacion: calificacion,
      },
    });

    // Crear respuestas asociadas al cuestionario si el cuestionario fue creado exitosamente
    let nuevaRespuesta;
    if (newQuiz) {
      nuevaRespuesta = await prisma.respuesta.create({
        data: {
          question1: respuestas.question1,
          question2: respuestas.question2,
          question3: respuestas.question3,
          question4: respuestas.question4,
          question5: respuestas.question5,
          question6: respuestas.question6,
          question7: respuestas.question7,
          question8: respuestas.question8,
          question9: respuestas.question9,
          question10: respuestas.question10,
          quizz: {
            connect: { id: newQuiz.id },
          },
        },
      });
    }

    // Responder con el nuevo cuestionario creado y la respuesta
    return NextResponse.json({ newQuiz, nuevaRespuesta }, { status: 201 });
  } catch (error) {
    // Manejo de errores
    console.error(error);
    return NextResponse.json({ error: 'Error al crear el cuestionario' }, { status: 500 });
  }
}
