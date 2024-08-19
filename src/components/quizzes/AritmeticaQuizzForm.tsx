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

const FormSchema = z.object({
  question1: z.enum(["1-r1", "1-r2", "1-r3", "1-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question2: z.enum(["2-r1", "2-r2", "2-r3", "2-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question3: z.enum(["3-r1", "3-r2", "3-r3", "3-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question4: z.enum(["4-r1", "4-r2", "4-r3", "4-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question5: z.enum(["5-r1", "5-r2", "5-r3", "5-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question6: z.enum(["6-r1", "6-r2", "6-r3", "6-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question7: z.enum(["7-r1", "7-r2", "7-r3", "7-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question8: z.enum(["8-r1", "8-r2", "8-r3", "8-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question9: z.enum(["9-r1", "9-r2", "9-r3", "9-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
  question10: z.enum(["10-r1", "10-r2", "10-r3", "10-r4"], {
    required_error: "Debes seleccionar una respuesta",
  }),
});

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


function AritmeticaQuizzForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log(data);
    const titulo = "Aritmética";

    axios
      .post("/api/quizzes", {
        titulo,
        respuestas: data,
      })
      .then((response) => {
        console.log(response);
        if(response.status === 201){
          router.push("/pages/user/quizzes/aritmetica/resultados")
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
