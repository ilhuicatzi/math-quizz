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

async function loadOptions() {
  const session = await getServerSession(authOptions)
  if (!session) return null
  try {
    const options = await prisma.optionQuestion.findMany()
    return options
  } catch (error) {
    console.log(error)
  }
}

async function OptionViewPage() {
  await middlewareSession(authOptions)
  const options = await loadOptions()
  console.log(options)
  return (
    <main className="flex flex-col place-items-center mt-28">
      <h1 className="text-2xl font-bold">Opciones a las preguntas</h1>
      <section className="flex mt-10 w-full px-16">
      <Table>
      <TableHeader>
        <TableRow>
          <TableHead>id</TableHead>
          <TableHead>optionId</TableHead>
          <TableHead>option</TableHead>
          <TableHead>color</TableHead>
          <TableHead>correct</TableHead>
          <TableHead >questionId</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {options?.map((item) => (
          <TableRow key={item.id}>
            <TableCell className="font-medium">{item.id}</TableCell>
            <TableCell>{item.optionId}</TableCell>
            <TableCell>{item.option}</TableCell>
            <TableCell><p className="col-span-2 flex items-center gap-2">
                  <span
                    className={`w-4 h-4 rounded-md ${item.color}`}
                  ></span>
                  {item.color}
                </p></TableCell>
            <TableCell>{item.correct ? "true" : "false"}</TableCell>
            <TableCell>{item.questionId}</TableCell>
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

export default OptionViewPage

