import { middlewareSession} from "@/middlewares/AuthServerSession"
import { authOptions } from "@/middlewares/AuthOptions"
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma"
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

async function loadQuestions() {
  const session = await getServerSession(authOptions)
  if (!session) return null
  try {
    const questions = await prisma.questionTopic.findMany()
    return questions
  } catch (error) {
    console.log(error)
  }
}

async function QuestionsViewPage() {
  await middlewareSession(authOptions)
  const questions = await loadQuestions()
  return (
    <main className="flex flex-col place-items-center mt-28">
      <h1 className="text-2xl font-bold">Lista de preguntas</h1>
      <section className="flex mt-10 w-full px-16">
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>questionId</TableHead>
          <TableHead>question</TableHead>
          <TableHead>issue</TableHead>
          <TableHead>topicId</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.questionId}</TableCell>
            <TableCell>{item.question}</TableCell>
            <TableCell>{item.issue}</TableCell>
            <TableCell>{item.topicId}</TableCell>
            <TableCell className="text-right">
            <div className="flex justify-end items-center gap-3">
              <button className="flex justify-center items-center group rounded-full p-2 hover:bg-background">
                <CiEdit className="group-hover:text-green-600 w-5 h-5" />
              </button>
              <button className="flex justify-center items-center group rounded-full p-2 hover:bg-background">
                <GoTrash className="group-hover:text-red-500" />
              </button>
            </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
      </section>
    </main>
  )
}

export default QuestionsViewPage

