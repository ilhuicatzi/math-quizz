import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    nombre: z.string().min(2, {
      message: "El nombre de usuario debe tener al menos 2 caracteres",
    }).refine((value) => !/\s/.test(value), {
      message: "El nombre de usuario no debe contener espacios usar PascalCasing",
    }).refine((value) => !/[^a-zA-ZñÑáéíóúÁÉÍÓÚ]/.test(value), {
      message: "El nombre de usuario no debe contener caracteres especiales",
    }).refine((value) => !/\d/.test(value), {
      message: "El nombre de usuario no debe contener números",
    }),
    apellido: z.string().min(2, {
      message: "El apellido de usuario debe tener al menos 2 caracteres",
    }).refine((value) => !/\s/.test(value), {
      message: "El apellido de usuario no debe contener espacios usar PascalCasing",
    }).refine((value) => !/[^a-zA-ZñÑáéíóúÁÉÍÓÚ]/.test(value), {
      message: "El apellido de usuario no debe contener caracteres especiales",
    }).refine((value) => !/\d/.test(value), {
      message: "El apellido de usuario no debe contener números",
    }),
    username: z.string().min(2, {
      message: "El nombre de usuario debe tener al menos 2 caracteres",
    }).refine((value) => !/\s/.test(value), {
      message: "El nombre de usuario no debe contener espacios usar PascalCasing",
    }).refine((value) => !/[^a-zA-ZñÑáéíóúÁÉÍÓÚ]/.test(value), {
      message: "El nombre de usuario no debe contener caracteres especiales",
    }),
    nivel: z.string().min(2, {
      message: "El nivel de usuario debe tener al menos 2 caracteres",
    }).refine((value) => !/\s/.test(value), {
      message: "El nivel de usuario no debe contener espacios",
    }),
    email: z.string().email({
      message: "Email invalido",
    }),
    password: z
      .string()
      .min(6, {
        message: "La contraseña debe tener al menos 6 caracteres",
      })
      .refine(
        (value) => !/\s/.test(value),
        "La contraseña no debe contener espacios"
      ),
  })
  .refine((data) => data.password !== data.nombre, {
    message: "La contraseña no puede ser igual al nombre del usuario",
    path: ["password"],
  })
  .refine((data) => data.password !== data.apellido, {
    message: "La contraseña no puede ser igual al apellido del usuario",
    path: ["password"],
  })
  .refine((data) => data.password !== data.email, {
    message: "La contraseña no puede ser igual al email",
    path: ["password"],
  })
  .refine((data) => data.nombre !== data.email, {
    message: "El nombre del usuario no puede ser igual al email",
    path: ["nombre"],
  })
  .refine((data) => data.apellido !== data.email, {
    message: "El apellido del usuario no puede ser igual al email",
    path: ["apellido"],
  });

  export const LoginFormSchema = z.object({
    email: z.string().email({
      message: "Email invalido",
    }),
    password: z.string().min(6, {
      message: "La contraseña debe tener al menos 6 caracteres",
    }).refine((value) => !/\s/.test(value), {
      message: "La contraseña no debe contener espacios",
    }),
  }).refine((data) => data.password !== data.email, {
    message: "La contraseña no puede ser igual al email",
    path: ["password"],
  });