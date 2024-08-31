import { middlewareSession} from "@/middlewares/AuthServerSession"
import { authOptions } from "@/middlewares/AuthOptions"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import NewQuestionForm from "@/components/admin/curriculum/NewQuestionForm"
import prisma from "@/lib/prisma"

async function getAllTopic() {
  try {
    const topic = await prisma.topics.findMany({
      select: {
        id: true,
        topic: true,
        topicId: true,
      },
    })
    return topic
  } catch (error) {
    console.error(error)
    
  }
}

async function NewQuestionPage() {
  await middlewareSession(authOptions)
  const topic = await getAllTopic()
  if (!topic) {
    return <div>Error al cargar los temas</div>
  }
  return (
    <main className="flex justify-center items-center w-full mt-10">
    <Card className="w-full max-w-sm sm:max-w-xl m-1">
        <CardHeader>
          <CardTitle className="text-2xl">Nueva Pregunta de Matemáticas</CardTitle>
          <CardDescription>
            Ingrese los datos de la nueva pregunta
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewQuestionForm topics={topic} />
        </CardContent>
      </Card>
    </main>
  )
}

export default NewQuestionPage