import { middlewareSession} from "@/middlewares/AuthServerSession"
import { authOptions } from "@/middlewares/AuthOptions"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import NewTopicForm from "@/components/admin/curriculum/NewTopicForm"
import prisma from "@/lib/prisma"

async function getAllAreas() {
  try {
    const areas = await prisma.curriculum.findMany({
      select: {
        id: true,
        area: true,
        areaId: true,
      },
    })
    return areas
  } catch (error) {
    console.error(error)
    
  }
}

async function NewAreaTopicPage() {
  await middlewareSession(authOptions)
  const areas = await getAllAreas()
  if (!areas) {
    return <div>Error al cargar las áreas</div>
  }

  return (
    <main className="flex justify-center items-center w-full mt-10">
    <Card className="w-full max-w-sm sm:max-w-xl m-1">
        <CardHeader>
          <CardTitle className="text-2xl">Nuevo Tema de Matemáticas</CardTitle>
          <CardDescription>
            Ingrese los datos del nuevo tema de matemáticas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <NewTopicForm areas={areas } />
        </CardContent>
      </Card>
    </main>
  )
}

export default NewAreaTopicPage