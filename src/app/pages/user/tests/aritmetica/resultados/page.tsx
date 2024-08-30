import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardFooter,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ButtonResultReditc from "@/components/quizzes/ButtonResultReditc";
import prisma from '@/lib/prisma';
import { getServerSession } from 'next-auth/next';
import { authOptions } from "@/middlewares/AuthOptions";
import { AritmeticaQuestions } from "@/lib/tests/AritmeticaQuestions";

async function loadLastQuizz() {
  try {
    // Obtener la sesión actual del usuario
    const session = await getServerSession(authOptions);

    // Verificar si el usuario está autenticado
    if (!session) {
      console.log('No autorizado');
      return null;
    }

    const userId = parseInt(session.user.id);

    const quizzAritmetica = await prisma.quizz.findMany({
      where: {
        titulo: 'Aritmética',
        estudianteId: userId, // Filtrar por el ID del usuario autenticado
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 1, // Obtener el último cuestionario
      include: {
        respuestas: true, // Incluir las respuestas asociadas
      },
    });

    if (quizzAritmetica.length === 0) {
      console.log('No se encontró ningún cuestionario de Aritmética para el usuario.');
      return null;
    }

    const lastQuizz = quizzAritmetica[0];
    return lastQuizz;
  } catch (error) {
    console.error('Error al cargar el último cuestionario de Aritmética del usuario:', error);
    return null;
  }
}


async function AritmeticaResultados() {
  const lastQuizz = await loadLastQuizz();
  const correctAnswers = AritmeticaQuestions.map((question) => question.correctAnswer);

  if (!lastQuizz) {
    return null;
  }
  if(lastQuizz.calificacion === null){
    lastQuizz.calificacion = 0;
  }

  const userAnswers = lastQuizz.respuestas
  const { id, quizzId, ...questions } = userAnswers[0];

  return (
    <main className="grid">
      <section className="flex justify-center items-center mt-10">
        <Card className="w-[500px]">
          <CardHeader>
            <CardTitle>Aritmética</CardTitle>
            <CardDescription>
              Resultados del quiz
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-foreground flex justify-between items-center">
                <p>Tu resultado es de <span className="px-3 text-md font-bold text-yellow-600 dark:text-yellow-400">{lastQuizz.calificacion}/10</span></p>
                <Badge variant={"secondary"}>{lastQuizz.calificacion <= 8 ? "¡Sigue practicando!" :"Bien Hecho"} </Badge>
            </CardDescription>
            <CardDescription className="mt-5">
              <p className="text-md font-semibold text-primary">Respuestas Correctas:</p>
              <ul className="list-disc list-inside">
                {Object.values(questions).map((answer, index) => (
                  <li key={index} className="text-md"> Pregunta {index +1} {answer === correctAnswers[index] ? "✔️" : "❌"}</li>
                ))}
              </ul>
            </CardDescription>
          </CardContent>
          <CardFooter className="flex justify-end mt-8">
            <ButtonResultReditc/>
          </CardFooter>
        </Card>
      </section>
    </main>
  )
}

export default AritmeticaResultados