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
import { AreaFormSchema } from "@/schemas/CurriculumSchemas";

function NewAreaForm() {
  const router = useRouter();
  const form = useForm<z.infer<typeof AreaFormSchema>>({
    resolver: zodResolver(AreaFormSchema),
    defaultValues: {
      area: "",
      areaId: "",
      abstract: "",
      colorTopic: "",
    },
  });

  async function onSubmit(data: z.infer<typeof AreaFormSchema>) {
    console.log(data);
    try {
      const res = await axios.post("/api/admins/curriculum/areas", data);
      console.log(res);

      if (res.status === 201) {
        toast.success("Area creada correctamente");
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
          name="area"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area</FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Escribe el nombre del área"
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
          name="areaId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Area_ID</FormLabel>
              <FormControl>
                <Input type="text" placeholder="Escribe el id del área" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="abstract"
          render={({ field }) => (
            <FormItem className="sm:col-span-2">
              <FormLabel>Username</FormLabel>
              <FormControl>
                <Textarea
                  rows={3}
                  placeholder="Escribe una descripción del área"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="colorTopic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color Area</FormLabel>
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
        <Button
          type="submit"
          variant="secondary"
          className="w-full sm:mt-8 mb-0"
        >
          Register
        </Button>
      </form>
    </Form>
  );
}

export default NewAreaForm;
