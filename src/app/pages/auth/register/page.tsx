import RegisterComponent from "@/components/auth/RegisterComponent"

function RegisterPage() {
  return (
    <main className="magic-bg h-[calc(100vh-55px)]">
      <section className="flex justify-center items-center mx-auto pt-10 px-5 mb-10">
        <RegisterComponent />
      </section>
    </main>
  )
}

export default RegisterPage