import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const allActivities = ["Aritmética", "Álgebra", "Geometría", "Trigonometría"]

type Quizz = {
  id: number;
  titulo: string;
  calificacion: number;
  createdAt: Date;
};

type QuizzArray = Quizz[]

function ActividadesPendientes({quizzes}: {quizzes: QuizzArray}) {
  const quizzesTitles = quizzes.map((quizz) => quizz.titulo)
  const pendingQuizzes = allActivities.filter(activity => !quizzesTitles.includes(activity))

  if (pendingQuizzes.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Actividades Pendientes</CardTitle>
          <CardDescription>
            No tienes actividades pendientes
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
    <CardHeader>
      <CardTitle>Actividades Pendientes</CardTitle>
      <CardDescription>
        Aquí podrás ver las actividades que tienes pendientes
      </CardDescription>
    </CardHeader>
    <CardContent>
      {
        pendingQuizzes.map((quizz) => (
          <div key={quizz} className="flex items-center justify-between py-3 border-b border-muted-foreground">
            <div className="flex items-center space-x-2">
              <div>
                <h3 className="text-sm font-medium">{quizz}</h3>
              </div>
            </div>
          </div>
        ))
      }
    </CardContent>
  </Card>
  )
}

export default ActividadesPendientes