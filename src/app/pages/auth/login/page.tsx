import LoginComponent from "@/components/auth/LoginComponent"

function LoginPage() {
  return (
    <main className="magic-bg h-[calc(100vh-55px)]">
      <section className="flex justify-center items-center mx-auto pt-16">
        <LoginComponent />
      </section>
    </main>
  )
}

export default LoginPage