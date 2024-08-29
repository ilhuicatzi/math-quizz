import RegisterFom from "@/components/admin/auth/RegisterForm"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function RegisterAdminPage() {
  return (
    <main className="flex justify-center items-center w-full mt-10">
<Card className="w-full max-w-sm sm:max-w-xl m-1">
    <CardHeader>
      <CardTitle className="text-2xl">Register Admin</CardTitle>
      <CardDescription>
        Enter your data below to register your account.
      </CardDescription>
    </CardHeader>
    <CardContent>
    <RegisterFom />
    </CardContent>
  </Card>
</main>
  )
}

export default RegisterAdminPage