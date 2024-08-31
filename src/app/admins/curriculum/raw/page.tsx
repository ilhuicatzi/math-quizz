import { middlewareSession } from "@/middlewares/AuthServerSession"
import { authOptions } from "@/middlewares/AuthOptions"
import prisma from "@/lib/prisma"

async function loadData() {
  try {
    const curriculumData = await prisma.curriculum.findMany({
      include: {
        topics: {
          include: {
            questions: true, // Incluye las preguntas asociadas a cada tema
          },
        },
      },
    });
    return curriculumData    
  } catch (error) {
    console.log(error)
  }
}



async function ApiRawPage() {
await middlewareSession(authOptions)
const curriculum = await loadData()
console.log(curriculum)
  return (
    <main className="mx-20 mt-10 flex justify-center items-center font-mono">
      {curriculum && <pre className="overflow-x-scroll">{JSON.stringify(curriculum, null, 2)}</pre>}
    </main>
  )
}

export default ApiRawPage