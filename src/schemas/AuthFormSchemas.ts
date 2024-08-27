import { z } from "zod";

export const RegisterFormSchema = z.object({
    nombre: z.string().min(2),
    apellido: z.string().min(2),
    username: z.string().min(2),
    email: z.string().email(),
    password: z.string().min(6),
    nivel: z.string().min(2),
  });

  export const LoginFormSchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  });
  