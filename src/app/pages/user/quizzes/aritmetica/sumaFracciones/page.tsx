"use client";

import CircularProgressBar from "@/components/quizzes/CircularProgress";
import { useState, useEffect, useMemo } from "react";
import DialogResponse from "@/components/quizzes/DialogResponse";
import Latex from "react-latex-next";
import styles from "@/styles/CircularProgres.module.css";
import { Button } from "@/components/ui/button";
import { MenuQuizzes } from "@/lib/dashboard/MenuQuizzes";
import { usePathname } from "next/navigation";
import { ResponseType } from "@/types/Quizz";

import { SumaFracciones as Questions } from "@/lib/quizz/AritmeticaQuizzes";

function QuizzPage() {
  const pathName = usePathname();
  const currentTopic = MenuQuizzes.find((topic) => topic.quizzesTopic.find((quiz) => quiz.path === pathName));
  const TITLE_QUIZ = currentTopic?.quizzesTopic.find((quiz) => quiz.path === pathName)?.topic || '';
  const NUMBER_QUESTIONS = Questions.length;
  const TOTAL_TIME = 60;
  const TIME_PERCENTAGE = useMemo(() => 100 / TOTAL_TIME, [TOTAL_TIME]);

  const [time, setTime] = useState(0);
  const [quizStarted, setQuizStarted] = useState(false);
  const [showQuestion, setShowQuestion] = useState(1);
  const [response, setResponse] = useState<ResponseType[]>([]);
  const [run, setRun] = useState(true);

  const percentage = time * TIME_PERCENTAGE;
  const alertClass =
    percentage > 60 && percentage <= 80 ? styles.time_alert : "";
  const dangerClass = percentage > 80 ? styles.time_danger : "";

  useEffect(() => {
    if (quizStarted && run) {
      const intervalTime = setInterval(() => {
        if (time < TOTAL_TIME) setTime((prevTime) => prevTime + 1);
      }, 1000);
      return () => clearInterval(intervalTime);
    }
  }, [time, quizStarted, run]);

  const getColorFill = (percentage: number) => {
    if (percentage > 80) return "#2e0202";
    if (percentage > 60) return "#382304";
    return "#034019";
  };

  const handleResponse = (idQuestion: number, idOption: string) => {
    setRun(true);
    if (showQuestion === NUMBER_QUESTIONS) {
      setRun(false);
    }
    setTime(0);
    setShowQuestion(idQuestion + 1);
    setResponse([...response, { idQuestion, idOption }]);
  };

  const handleFinish = () => {
    console.log(response);
    alert("Has finalizado la evaluación");
    setRun(false);
  };

  const renderInstructions = () => (
    <section className="flex items-center flex-col mt-10">
      <article className="w-2/3 flex flex-col justify-center items-center gap-4">
        <h1 className="text-3xl font-bold text-center text-primary mb-5">
          {TITLE_QUIZ}
        </h1>
        <h2 className="text-xl font-medium text-center">Instrucciones</h2>
        <p className="text-lg text-center">
          A continuación, se presentan una serie de preguntas, selecciona la
          respuesta correcta y presiona el botón continuar para pasar a la
          siguiente pregunta.
        </p>
        <div className="flex justify-center items-center w-full px-10">
          <Button
            className="mt-10 px-14 bg-green-600 text-white"
            onClick={() => setQuizStarted(true)}
          >
            Comenzar
          </Button>
        </div>
      </article>
    </section>
  );

  const renderQuestion = () =>
    Questions.map((question) => (
      <article
        key={question.id}
        className={`items-center flex-col gap-4 w-2/3 my-8 ${
          showQuestion === question.id ? "flex" : "hidden"
        } `}
      >
        <h2 className="text-2xl font-bold">{question.title}</h2>
        <div className={`${styles.time} ${alertClass} ${dangerClass}`}>
          <CircularProgressBar
            percentage={100 - time * TIME_PERCENTAGE}
            props={{ className: `${styles.time_bar}` }}
            colorFill={getColorFill(time)}
          />
          <span className={styles.time_number}>
            {(TOTAL_TIME - time).toString().padStart(2, "0")}
          </span>
        </div>
        <div className="text-lg text-center">
          <Latex>{`${question.description}`}</Latex>
        </div>
        <div
          className={`grid-cols-4 gap-5 mt-10 ${
            time === TOTAL_TIME ? "hidden" : "grid"
          }`}
        >
          {question.options.map((option) => (
            <DialogResponse
              key={option.id}
              options={option}
              idQuestion={question.id}
              handleResponse={handleResponse}
            />
          ))}
        </div>
        <div
          className={`w-3/4 mt-10 ${time === TOTAL_TIME ? "block" : "hidden"}`}
        >
          <h3 className="text-lg font-medium text-center">
            El tiempo se ha agotado, pulsa continuar para pasar a la siguiente
            pregunta.
          </h3>
          <div className="flex justify-center items-center w-full">
            <Button
              variant="destructive"
              className="mt-10 px-10"
              onClick={() => handleResponse(question.id, "none")}
            >
              Continuar
            </Button>
          </div>
        </div>
      </article>
    ));

  const renderFinishMessage = () => (
    <article className="w-2/3 flex flex-col justify-center items-center gap-4">
      <h2 className="text-2xl font-medium text-center">Fin de la evaluación</h2>
      <p className="text-lg text-center">
        Has finalizado la evaluación, presiona el botón continuar para enviar
        tus respuestas y obtener los resultados.
      </p>
      <div className="flex justify-end items-center w-full px-10">
        <Button className="mt-10" onClick={handleFinish}>
          Continuar
        </Button>
      </div>
    </article>
  );

  //console.log({ response: response, showQuestion: showQuestion });

  return (
    <section className="flex items-center flex-col mt-10">
      {!quizStarted
        ? renderInstructions()
        : NUMBER_QUESTIONS >= showQuestion
        ? renderQuestion()
        : renderFinishMessage()}
    </section>
  );
}

export default QuizzPage;
