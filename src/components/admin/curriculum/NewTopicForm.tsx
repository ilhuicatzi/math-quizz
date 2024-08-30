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
import { colors } from "@/lib/ColorSelect";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { TopicFormSchema } from "@/schemas/CurriculumSchemas";

const timeTopic = [
  { name: "5 minutos", value: "5_minutos" },
  { name: "10 minutos", value: "10_minutos" },
  { name: "15 minutos", value: "15_minutos" },
  { name: "20 minutos", value: "20_minutos" },
  { name: "25 minutos", value: "25_minutos" },
  { name: "30 minutos", value: "30_minutos" },
];

interface AreasInterface {
  id: number;
  area: string;
  areaId: string;
}

function NewTopicForm({ areas }: { areas: AreasInterface[] }) {
  const router = useRouter();
  const form = useForm<z.infer<typeof TopicFormSchema>>({
    resolver: zodResolver(TopicFormSchema),
    defaultValues: {
      topicId: "",
      topic: "",
      duration: "",
      colorTopic: "",
      description: "",
      path: "",
      branch: "",
    },
  });

  async function onSubmit(data: z.infer<typeof TopicFormSchema>) {
    console.log(data);
    try {
      const res = await axios.post("/api/admins/curriculum/topic", data);
      console.log(res);

      if (res.status === 201) {
        toast.success("Tema creado correctamente");
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
          name="topic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tema</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Escribe el nombre del tema"
                  autoFocus
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="topicId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tema_ID</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Escribe el id del tema"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="duration"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tiempo</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Calcula un tiempo" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {timeTopic.map((time) => (
                    <SelectItem key={time.name} value={time.value}>
                      <p>{time.name}</p>
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
          name="colorTopic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color Tema</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona un color" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {colors.map((color) => (
                    <SelectItem key={color.name} value={color.value}>
                      <p className="flex items-center gap-2">
                        <span
                          className={`w-4 h-4 rounded-md ${color.value}`}
                        ></span>
                        <span>{color.name}</span>
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
          name="description"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="Escribe una descripción del tema"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="path"
          render={({ field }) => (
            <FormItem >
              <FormLabel>Ruta</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Escriba la ruta del tema"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
                <FormField
          control={form.control}
          name="branch"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Seleciona una área" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {areas.map((area) => (
                    <SelectItem key={area.id} value={area.areaId}>
                      <p>{area.area}</p>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
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

export default NewTopicForm;
