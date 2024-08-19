import AritmeticaQuizzForm from "@/components/quizzes/AritmeticaQuizzForm";
function AritmeticaQuizzPage() {

  return (
    <main className="flex flex-col justify-center items-center mb-8 p-5">
      <section className="sm:w-3/4 xl:w-2/3 mt-20 ">
        <h1 className="text-3xl text-primary font-medium">
          Quizz de Aritmética
        </h1>
        <p className="dark:text-zinc-300 text-zinc-700">
          <strong>Instrucciones: </strong>
          Completa la información y lee atentamente cada pregunta y selecciona
          la respuesta correcta.
        </p>
      </section>

      <section className="sm:w-3/4 xl:w-2/3 mt-10 ">
        <AritmeticaQuizzForm />
      </section>
    </main>
  );
}

export default AritmeticaQuizzPage;
