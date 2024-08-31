import { middlewareSession } from "@/middlewares/AuthServerSession"
import { authOptions } from "@/middlewares/AuthOptions"
import prisma from "@/lib/prisma"

async function loadData() {
  try {
    const curriculum = await prisma.curriculum.findMany()
    const topics = await prisma.topics.findMany()
    const res = {
      curriculum,
      topics
    }
    return res
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
      {curriculum &&JSON.stringify(curriculum, null, 2)}
    </main>
  )
}

export default ApiRawPage