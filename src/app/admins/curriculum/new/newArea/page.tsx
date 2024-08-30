import NewAreaForm from "@/components/admin/curriculum/NewAreaForm"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function NewAreaPage() {
  return (
    <main className="flex justify-center items-center w-full mt-10">
    <Card className="w-full max-w-sm sm:max-w-xl m-1">
        <CardHeader>
          <CardTitle className="text-2xl">Nueva Area de Matemáticas</CardTitle>
          <CardDescription>
            Ingrese los datos de la nueva área.
          </CardDescription>
        </CardHeader>
        <CardContent>
        <NewAreaForm />
        </CardContent>
      </Card>
    </main>
  )
}

export default NewAreaPage