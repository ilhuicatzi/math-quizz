"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { QuestionFormSchema } from "@/schemas/CurriculumSchemas";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const numberQuestion = [
  { id: 1, name: "Pregunta 1", value: "quizz1" },
  { id: 2, name: "Pregunta 2", value: "quizz2" },
  { id: 3, name: "Pregunta 3", value: "quizz3" },
  { id: 4, name: "Pregunta 4", value: "quizz4" },
  { id: 5, name: "Pregunta 5", value: "quizz5" },
];

interface TopicsInterface {
  id: number;
  topic: string;
  topicId: string;
}

function NewQuestionForm({ topics }: { topics: TopicsInterface[] }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof QuestionFormSchema>>({
    resolver: zodResolver(QuestionFormSchema),
    defaultValues: {
      questionTitle: "",
      question: "",
      issue: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correct: undefined,
    },
  });

  async function onSubmit(data: z.infer<typeof QuestionFormSchema>) {
    console.log(data);
    try {
      const res = await axios.post("/api/admins/curriculum/question", data);
      console.log(res);

      if (res.status === 201) {
        toast.success("pregunta creada correctamente");
        router.push("/admins/curriculum");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid sm:grid-cols-2 gap-4 mt-4"
      >
        <FormField
          control={form.control}
          name="issue"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Selecciona un tema</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleciona una tema" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {topics.map((topic) => (
                    <SelectItem key={topic.id} value={topic.topicId}>
                      <p className="flex items-center gap-2">
                        <span className="font-medium">{topic.topicId}</span>
                        <span>{topic.topic}</span>
                      </p>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="questionTitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Número de Pregunta</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona una opción" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {numberQuestion.map((question) => (
                    <SelectItem key={question.id} value={question.value}>
                      <p className="flex items-center gap-2">
                        <span>{question.name}</span>
                      </p>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="question"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Pregunta</FormLabel>
              <FormControl>
                <Textarea
                  rows={2}
                  placeholder="Escribe la pregunta"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="correct"
          render={({ field }) => (
            <FormItem className="space-y-3 sm:col-span-2">
              <FormLabel>
                Escribe las opciones y marca la opción correcta
              </FormLabel>
              <FormControl>
                <RadioGroup
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  className="grid grid-cols-1 sm:grid-cols-2 gap-4"
                >
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="r1" />
                    </FormControl>
                    <FormField
                      control={form.control}
                      name="option1"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Escribe la opción 1"
                              autoFocus
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="r2" />
                    </FormControl>
                    <FormField
                      control={form.control}
                      name="option2"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Escribe la opción 2"
                              autoFocus
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="r3" />
                    </FormControl>
                    <FormField
                      control={form.control}
                      name="option3"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Escribe la opción 3"
                              autoFocus
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>
                  <FormItem className="flex items-center space-x-3 space-y-0">
                    <FormControl>
                      <RadioGroupItem value="r4" />
                    </FormControl>
                    <FormField
                      control={form.control}
                      name="option4"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input
                              type="text"
                              placeholder="Escribe la opción 4"
                              autoFocus
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </FormItem>
                </RadioGroup>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormItem className="sm:col-span-2">
          <Button type="submit" variant="secondary" className="w-full">
            Crear Tema
          </Button>
        </FormItem>
      </form>
    </Form>
  );
}

export default NewQuestionForm;
