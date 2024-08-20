"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Quizz } from "@/types/Quizz";

function ActividadesRealizadas({quizzes}: {quizzes: Quizz[]}) {
  return (
    <Card>
    <CardHeader>
      <CardTitle className="text-2xl">Actividades Realizadas</CardTitle>
      <CardDescription>
        Aquí podrás ver las actividades que tienes Realizadas
      </CardDescription>
    </CardHeader>
    <CardContent>
      {
        quizzes.map((quizz) => (
          <div key={quizz.id} className="flex items-center justify-between py-3 border-b border-muted-foreground">
            <div className="flex items-center space-x-2">
              <div>
                <h3 className="text-sm font-medium">{quizz.titulo}</h3>
                <p className="text-xs text-muted-foreground">Calificación: {quizz.calificacion}</p>
              </div>
            </div>
          </div>
        ))
      }
    </CardContent>
  </Card>
  )
}

export default ActividadesRealizadas