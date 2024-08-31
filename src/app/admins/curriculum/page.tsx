import { middlewareSession } from "@/middlewares/AuthServerSession"
import { authOptions } from "@/middlewares/AuthOptions"
import ChartDataComponent from "@/components/admin/curriculum/ChartComponent"
import prisma from "@/lib/prisma"

async function dataInformationDB() {
  try {
    const [curriculum, topics, questions] = await Promise.all([
      prisma.curriculum.count(),
      prisma.topics.count(),
      prisma.questionTopic.count(),
    ]);
  
    return {
      curriculum: curriculum,
      topics: topics,
      questions: questions,
    };
  } catch (error) {
    console.error(error)
    
  }
}

async function CurriculumPage() {
  await middlewareSession(authOptions)
  const data = await dataInformationDB()
  console.log(data)
  
  return (
    <main className="flex flex-col justify-center items-center mx-auto mt-14">
      <h1 className="text-4xl font-bold mb-20">Curriculum</h1>
      <ChartDataComponent data={data || { curriculum: 0, topics: 0, questions: 0 }}/>
    </main>
  )
}

export default CurriculumPage

