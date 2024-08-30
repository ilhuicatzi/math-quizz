import { middlewareSession } from "@/middlewares/AuthServerSession";
import { authOptions } from "@/middlewares/AuthOptions";
import { getServerSession } from "next-auth";
import prisma from "@/lib/prisma";
import { CiEdit } from "react-icons/ci";
import { GoTrash } from "react-icons/go";

async function loadTopics() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  try {
    const res = await prisma.topics.findMany();
    return res;
  } catch (error) {
    console.log(error);
  }
}

async function TopicViewPage() {
  await middlewareSession(authOptions);
  const topics = await loadTopics();
  console.log(topics);
  if (!topics) {
    return <div>Error al cargar los temas</div>;
  }

  return (
    <main className="flex flex-col place-items-center mt-10">
      <h1 className="text-2xl font-bold">Temas de Matemáticas</h1>
      <section className="flex flex-col w-2/3 mt-10">
        {topics &&
          topics.map((topic) => (
            <article
              className="mb-5 border-b-2 hover:bg-zinc-200 dark:hover:bg-zinc-900 p-5"
              key={topic.id}
            >
              <div className="grid grid-cols-3 gap-3 mb-4">
                <p className="font-mono text-right font-semibold">Id:</p>
                <p className="col-span-2">{topic.id}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <p className="font-mono text-right font-semibold">Tema:</p>
                <p className="col-span-2">{topic.topic}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <p className="font-mono text-right font-semibold">Tema_ID:</p>
                <p className="col-span-2">{topic.topicId}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <p className="font-mono text-right font-semibold">Pretenece:</p>
                <p className="col-span-2">{topic.branch}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <p className="font-mono text-right font-semibold">
                  Descripción:
                </p>
                <p className="col-span-2">{topic.description}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <p className="font-mono text-right font-semibold">
                  Tiempo estimado:
                </p>
                <p className="col-span-2">{topic.duration.replace("_", " ")}</p>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <p className="font-mono text-right font-semibold">Color:</p>
                <p className="col-span-2 flex items-center gap-2">
                  {" "}
                  <span
                    className={`w-4 h-4 rounded-md ${topic.colorTopic}`}
                  ></span>{" "}
                  {topic.colorTopic}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3 mb-4">
                <p className="font-mono text-right font-semibold">Ruta:</p>
                <p className="col-span-2"> {topic.path}</p>
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
  );
}

export default TopicViewPage;
