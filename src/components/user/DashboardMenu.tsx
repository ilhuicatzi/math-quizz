"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { LayoutGrid, Activity, AlarmClock, Trophy } from "lucide-react";
import DatosGeneralesUser from "@/components/user/DatosGeneralesUser";
import ActividadesQuizzMenu from "@/components/user/ActividadesQuizzMenu";
import ActividadesPendientes from "@/components/user/ActividadesPendientes";
import ActividadesRealizadas from "@/components/user/ActividadesRealizadas";
import { Quizz } from ".prisma/client";

function DashboardMenu({quizzes}: {quizzes: Quizz[]}) {
  const { data: session } = useSession()
  const [showMenu, setShowMenu] = useState("actividades");

  if (!session) {
    return null;
  }
  const id = session.user.id;
  
  return (
    <div className="px-5 mx-auto grid w-full max-w-6xl items-start gap-6 grid-cols-[20px_1fr]  sm:grid-cols-[40px_1fr]  md:grid-cols-[80px_1fr] lg:grid-cols-[250px_1fr]">
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
      <DatosGeneralesUser quizzes={quizzes} />
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
  )
}

export default DashboardMenu