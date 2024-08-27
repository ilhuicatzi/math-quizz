"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Latex from "react-latex-next";
import { Button } from "@/components/ui/button";
import { AritmeticaQuestions } from "@/lib/AritmeticaQuestions";
import { useRouter } from "next/navigation";
import axios from "axios";
import CircularProgressBar from "@/components/quizzes/CircularProgress";
import { FormSchemaQuestions } from "@/schemas/QuestionsFormSchema";
import { useState, useEffect } from "react";
import styles from "@/styles/CircularProgres.module.css";

interface FormValues {
  question1: string;
  question2: string;
  question3: string;
  question4: string;
  question5: string;
  question6: string;
  question7: string;
  question8: string;
  question9: string;
  question10: string;
}

const TOTAL_TIME = 90;
const TIME_PERCENTAGE = 100 / TOTAL_TIME;

const getColorFill = (time: number) => {
  if (time * TIME_PERCENTAGE > 80) return "#2e0202";
  if (time * TIME_PERCENTAGE > 60) return "#382304";
  return "#034019";
};

function AritmeticaQuizzForm() {
  const router = useRouter();
  const [time, setTime] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingResponse, setLoadingResponse] = useState(false);
  const [viewExplanation, setViewExplanation] = useState(false);
  const [run, setRun] = useState(true);
  const form = useForm<z.infer<typeof FormSchemaQuestions>>({
    resolver: zodResolver(FormSchemaQuestions),
  });

  useEffect(() => {
    if (!loadingResponse) {
      const intervalTIme = setInterval(() => {
        if (time < TOTAL_TIME && run) setTime((prev) => prev + 1);
      }, 1000);
      if (time === TOTAL_TIME) {
        setRun(false);
      }
      return () => clearInterval(intervalTIme);
    }
  }, [time, loadingResponse, run]);

  function onSubmit(data: z.infer<typeof FormSchemaQuestions>) {
    console.log(data);
    const titulo = "Aritmética";

    axios
      .post("/api/quizzes", {
        titulo,
        respuestas: data,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 201) {
          router.push("/pages/user/quizzes/aritmetica/resultados");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="flex flex-col gap-y-8"
      >
        {AritmeticaQuestions.map((question) => (
          <Card className="group" key={question.id}>
            <CardHeader>
              {!loadingResponse && (
                <div
                  className={`relative ${styles.time}
                                      ${time * TIME_PERCENTAGE > 60 && time * TIME_PERCENTAGE <= 80 && styles.time_alert}
                                      ${time * TIME_PERCENTAGE > 80 && styles.time_danger}`}
                >
                  <CircularProgressBar
                    percentage={100 - time * TIME_PERCENTAGE}
                    props={{ className: `${styles.time_bar}` }}
                    colorFill={getColorFill(time)}
                  />
                  <span className={styles.}>
                    {(TOTAL_TIME - time).toString().padStart(2, "0")}
                  </span>
                </div>
              )}
              <CardTitle className="font-normal mb-2 text-xl">
                {question.title}
              </CardTitle>
              <CardDescription className="group-hover:text-foreground">
                <Latex>{question.description}</Latex>
              </CardDescription>
            </CardHeader>
            <CardContent>
              <FormField
                control={form.control}
                name={question.quizz_id as keyof FormValues}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        {question.options.map((option) => (
                          <FormItem
                            key={option.id}
                            className="flex items-center space-x-2"
                          >
                            <FormControl>
                              <RadioGroupItem value={option.id} />
                            </FormControl>
                            <FormLabel htmlFor={option.id} className="pb-2">
                              <Latex>{option.value}</Latex>
                            </FormLabel>
                          </FormItem>
                        ))}
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        ))}

        <Button type="submit" className="w-full text-foreground">
          Enviar respuestas
        </Button>
      </form>
    </Form>
  );
}

export default AritmeticaQuizzForm;
