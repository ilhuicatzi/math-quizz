"use client";

import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useSession } from "next-auth/react";
import { Quizz } from "@/types/Quizz";

function DatosGeneralesUser({ quizzes }: { quizzes: Quizz[] }) {
  const { data: session } = useSession();
  const user = session?.user;

  const quizzesRealizados = quizzes.filter(
    (quizz) => quizz.calificacion !== null
  );

  const promedio =
    quizzesRealizados.length > 0
      ? quizzesRealizados.reduce(
          (acc, quizz) => acc + (quizz.calificacion ?? 0),
          0
        ) / quizzesRealizados.length
      : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Datos Generales</CardTitle>
        <CardDescription>
          Información general acerca de tu cuenta
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <div>
          <div className="grid gap-y-2 mb-3">
            <Label>Nombre:</Label>
            <Input
              type="text"
              value={`${user?.nombre} ${user?.apellido}`}
              disabled
            />
          </div>
          <div className="grid gap-y-2 mb-3">
            <Label>Email:</Label>
            <Input type="email" value={user?.email} disabled />
          </div>
          <div className="grid gap-y-2">
            <Label>Nivel Escolar:</Label>
            <Input type="text" value={user?.nivel} disabled />
          </div>
        </div>
        <div className="px-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl text-center">Promedio</CardTitle>
              <CardDescription className="text-xs text-center">
                Promedio de las calificaciones de los quizz realizados
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p
                className={`text-lg font-bold text-center ${
                  promedio !== null
                    ? "text-3xl text-blue-500 dark:text-yellow-500"
                    : "text-lg text-blue-500 dark:text-yellow-500"
                }`}
              >
                {promedio !== null
                  ? promedio.toFixed(2)
                  : "Aún no has realizado ningún quizz"}
              </p>
            </CardContent>
          </Card>
        </div>
      </CardContent>
    </Card>
  );
}

export default DatosGeneralesUser;
