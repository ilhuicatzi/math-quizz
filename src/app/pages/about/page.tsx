
function AboutPage() {
  return (
    <main className="magic-bg h-[calc(100vh-55px)]">
      <section className="flex justify-center items-center py-10 mx-auto w-3/4">
      <article className="flex justify-center items-center flex-col">
      <h1 className="font-bold text-4xl pb-10">Math Quizz</h1>
      <p className="w-3/4">
Math Quizz es una aplicación diseñada para reforzar y evaluar los conocimientos en matemáticas en las áreas de aritmética, álgebra y geometría, alineada con los planes y programas educativos de nivel secundaria y bachillerato en México. Su objetivo es proporcionar material de apoyo tanto para docentes como para alumnos, mediante la creación de cuestionarios que faciliten el repaso y la evaluación de los conocimientos matemáticos. Estos cuestionarios están estructurados bajo un formalismo riguroso y se basan en modelos de pruebas estandarizadas, como las pruebas Planea o Ceneval.</p>
<div className="flex justify-end w-full mt-10 font-mono text-sm">
    <div className="flex flex-col items-end">
        <p>Gonzalo Ilhuicatzi</p>
        <p>g.ilhuicatzi@gmail.com</p>
        <p>2024</p>
    </div>
</div>
      </article>
      </section>
    </main>
  )
}

export default AboutPage