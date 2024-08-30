import DashboardMenu from "@/components/user/DashboardMenu";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "@/middlewares/AuthOptions";

async function loadQuizzes() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return null;
  }
  const userId = parseInt(session.user.id);
  const quizzes = await prisma.quizzes.findMany({
    where: {
      estudianteId: userId,
    },
  });
  return quizzes;
}

async function Dashboard() {
  const result = await loadQuizzes();
  if (!result) {
    return null;
  }
  const quizzes = result;

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 py-4 pt-5 md:gap-x-8 mt-2">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="px-4 mb-5 text-2xl sm:text-3xl lg:text-4xl font-semibold text-center">
            Tablero de Actividades
          </h1>
        </div>
        <DashboardMenu quizzes={quizzes} />
      </main>
    </div>
  );
}

export default Dashboard;
