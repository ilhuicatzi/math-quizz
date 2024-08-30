import { middlewareSession} from "@/middlewares/AuthServerSession"
import { authOptions } from "@/middlewares/AuthOptions"
import { getServerSession } from "next-auth"
import prisma from "@/lib/prisma"
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";

async function loadAreas() {
  const session = await getServerSession(authOptions)
  if (!session) return null
  try {
    const areas = await prisma.curriculum.findMany({
      where: {
        adminId: parseInt(session.user.id)
      }
    })
    return areas
  } catch (error) {
    console.log(error)
  }
}

async function AreaViewPage() {
  await middlewareSession(authOptions)
  const areas = await loadAreas()
  console.log(areas)
  return (
    <main className="flex flex-col place-items-center mt-10">
      <h1 className="text-2xl font-bold">Áreas de Matemáticas</h1>
      <section className="flex flex-col w-2/3 mt-10">
        {areas && areas.map((area) => (
          <article className="mb-5 border-b-2 hover:bg-zinc-200 dark:hover:bg-zinc-900 p-5" key={area.id}>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <p className="font-mono text-right font-semibold">Id:</p>
              <p className="col-span-2">{area.id}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <p className="font-mono text-right font-semibold">Área:</p>
              <p className="col-span-2">{area.area}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <p className="font-mono text-right font-semibold">Resumen:</p>
              <p className="col-span-2">{area.abstract}</p>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              <p className="font-mono text-right font-semibold">Color:</p>
              <p className="col-span-2">{area.colorTopic}</p>
            </div>
            <div className="flex justify-end items-center gap-3">
              <button className="flex justify-center items-center group rounded-full p-2 hover:bg-background">
                <CiEdit className="group-hover:text-green-600 w-5 h-5" />
              </button>
              <button className="flex justify-center items-center group rounded-full p-2 hover:bg-background">
                <GoTrash className="group-hover:text-red-500" />
              </button>
            </div>
          </article>
        ))}
      </section>
    </main>
  )
}

export default AreaViewPage