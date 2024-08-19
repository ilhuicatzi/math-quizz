"use client"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Quizz = {
  id: number;
  titulo: string;
  calificacion: number;
  createdAt: Date;
};

type QuizzArray = Quizz[]

function ActividadesRealizadas({quizzes}: {quizzes: QuizzArray}) {
  console.log(quizzes)
  return (
    <Card>
    <CardHeader>
      <CardTitle>Actividades Realizadas</CardTitle>
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