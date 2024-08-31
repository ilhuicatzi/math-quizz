import Link from "next/link";
import { middlewareSession } from "@/middlewares/AuthServerSession";
import { authOptions } from "@/middlewares/AuthOptions";
import { redirect } from "next/navigation";

async function Home() {
  const session= await middlewareSession(authOptions);
  if (session.user.isAdmin) return redirect('/admins/curriculum');

  return (
    <main className="bg-[url('/img/portada.jpg')] absolute w-full h-screen">
      <div className="absolute inset-0 dark:bg-black dark:opacity-60"></div>
      <article className="flex justify-center items-center relative z-10 mt-32">
        <section className="w-3/4 flex flex-col items-center">
          <h1 className="text-5xl font-medium"> Bienvenido</h1>
          <p className="mb-8">Pulsa el botón para iniciar el quizz.</p>
          
          <div className="flex justify-center px-10">
          <div className="absolute hover:scale-150 p-3 bg-opacity-35 bg-zinc-300 dark:bg-opacity-30 dark:bg-zinc-800 rounded-full transition duration-500">
            <div className=" p-3 dark:bg-opacity-30 dark:bg-zinc-900 bg-opacity-35 bg-zinc-400 rounded-full animate-pulse hover:animate-none">
              <button
                className="bg-primary hover:bg-blue-500 text-white dark:bg-primary hover:dark:bg-yellow-500 w-24 h-24 rounded-full"
              >
                <Link href="/pages/auth/login">
                Comenzar
                </Link>
              </button>
            </div>
            </div>
          </div>
        </section>
      </article>
    </main>
  );
}

export default Home;
