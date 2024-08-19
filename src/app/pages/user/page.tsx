"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { LayoutGrid, Activity, AlarmClock, Trophy } from "lucide-react";
import DatosGeneralesUser from "@/components/user/DatosGeneralesUser";
import ActividadesQuizzMenu from "@/components/user/ActividadesQuizzMenu";
import ActividadesPendientes from "@/components/user/ActividadesPendientes";
import ActividadesRealizadas from "@/components/user/ActividadesRealizadas";

type User = {
  id: number;
  nombre: string;
  apellido: string;
  username: string;
  email: string;
  escuela: string;
  grado: string;
  grupo: string;
  createdAt: Date;
};

type Quizz = {
  id: number;
  titulo: string;
  calificacion: number;
  createdAt: Date;
};

type QuizzArray = Quizz[]

function Dashboard() {
  const [dataResults, setDataResults] = useState<{ user: User, quizzes: QuizzArray }>({ user: {} as User, quizzes: [] as QuizzArray})
  const [showMenu, setShowMenu] = useState("actividades");
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios.get("/api/resultsQuizz")
      setDataResults(result.data)
    }
    fetchData()
  }
  , [])
  console.log(dataResults)
  
  if (!dataResults) {
    return null;
  }

  const user = dataResults.user as User
  const quizzes = dataResults.quizzes as Quizz[]

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 py-4 pt-5 md:gap-x-8 mt-2">
        <div className="mx-auto grid w-full max-w-6xl gap-2">
          <h1 className="px-4 mb-5 text-2xl sm:text-3xl lg:text-4xl font-semibold text-center">Tablero de Actividades </h1>
        </div>
        <div className="px-3 mx-auto grid w-full max-w-6xl items-start gap-6 grid-cols-[20px_1fr]  sm:grid-cols-[40px_1fr]  md:grid-cols-[80px_1fr] lg:grid-cols-[250px_1fr]">
          <nav className="grid gap-8 pt-1 px-1 text-sm text-muted-foreground dark:text-muted-foreground place-items-start">
            <button
              onClick={() => {
                setShowMenu("general");
              }}
              className={`font-semibold flex items-center ${
                showMenu === "general"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <LayoutGrid className="w-5 h-5 mr-2" />
              <span className="hidden lg:flex">General</span>
            </button>

            <button
              onClick={() => {
                setShowMenu("actividades");
              }}
              className={`font-semibold flex items-center ${
                showMenu === "actividades"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Activity className="w-5 h-5 mr-2" />
              <span className="hidden lg:flex">Actividades</span>
            </button>
            <button
              onClick={() => {
                setShowMenu("actividadesPendientes");
              }}
              className={`font-semibold flex items-center ${
                showMenu === "actividadesPendientes"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <AlarmClock className="w-5 h-5 mr-2" />
              <span className="hidden lg:flex">Actividades Pendientes</span>
            </button>
            <button
              onClick={() => {
                setShowMenu("actividadesRealizadas");
              }}
              className={`font-semibold flex items-center ${
                showMenu === "actividadesRealizadas"
                  ? "text-primary"
                  : "text-muted-foreground"
              }`}
            >
              <Trophy className="w-5 h-5 mr-2" />
              <span className="hidden lg:flex">Actividades Realizadas</span>
            </button>
          </nav>

          <div
            className={`grid gap-6 ${
              showMenu === "general" ? "flex-1" : "hidden"
            }`}
          >
            <DatosGeneralesUser user={user}  />
          </div>

          <div
            className={`grid gap-6 ${
              showMenu === "actividades" ? "flex-1" : "hidden"
            }`}
          >
            <ActividadesQuizzMenu />
          </div>

          <div
            className={`grid gap-6 ${
              showMenu === "actividadesPendientes" ? "flex-1" : "hidden"
            }`}
          >
            <ActividadesPendientes quizzes={quizzes} />
          </div>

          <div
            className={`grid gap-6 ${
              showMenu === "actividadesRealizadas" ? "flex-1" : "hidden"
            }`}
          >
            <ActividadesRealizadas quizzes={quizzes} />
          </div>

        </div>
      </main>
    </div>
  );
}

export default Dashboard;
