import LoginFom from "@/components/admin/auth/LoginFom"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

function LoginAdminPage() {
  return (
<main className="flex justify-center items-center w-full mt-10">
<Card className="w-full max-w-sm">
    <CardHeader>
      <CardTitle className="text-2xl">Login Admin</CardTitle>
      <CardDescription>
        Enter your email below to login to your account.
      </CardDescription>
    </CardHeader>
    <CardContent>
    <LoginFom />
    </CardContent>
  </Card>
</main>
  )
}

export default LoginAdminPage
