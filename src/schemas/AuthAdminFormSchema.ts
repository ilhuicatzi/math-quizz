import { z } from "zod";

export const RegisterFormSchema = z
  .object({
    firstName: z.string().min(2, {
      message: "the firstName of the user must have at least 2 characters",
    }).refine((value) => !/\s/.test(value), {
      message: "the firstName of the user must not contain spaces use PascalCasing",
    }).refine((value) => !/[^a-zA-ZñÑáéíóúÁÉÍÓÚ]/.test(value), {
      message: "the firstName of the user must not contain special characters",
    }).refine((value) => !/\d/.test(value), {
      message: "the firstName of the user must not contain numbers",
    }),
    lastName: z.string().min(2, {
      message: "the lastName of the user must have at least 2 characters",
    }).refine((value) => !/\s/.test(value), {
      message: "the lastName of the user must not contain spaces use PascalCasing",
    }).refine((value) => !/[^a-zA-ZñÑáéíóúÁÉÍÓÚ]/.test(value), {
      message: "the lastName of the user must not contain special characters",
    }).refine((value) => !/\d/.test(value), {
      message: "the lastName of the user must not contain numbers",
    }),
    username: z.string().min(2, {
      message: "the username of the user must have at least 2 characters",
    }).refine((value) => !/\s/.test(value), {
      message: "the username of the user must not contain spaces use PascalCasing",
    }).refine((value) => !/[^a-zA-ZñÑáéíóúÁÉÍÓÚ]/.test(value), {
      message: "the username of the user must not contain special characters",
    }),
    email: z.string().email({
      message: "Invalid email",
    }),
    password: z
      .string()
      .min(6, {
        message: "the password must have at least 6 characters",
      })
      .refine(
        (value) => !/\s/.test(value),
        "the password must not contain spaces"
      ),
  })
  .refine((data) => data.password !== data.firstName, {
    message: "the password cannot be the same as the firstName of the user",
    path: ["password"],
  })
  .refine((data) => data.password !== data.lastName, {
    message: "the password cannot be the same as the lastName of the user",
    path: ["password"],
  })
  .refine((data) => data.password !== data.email, {
    message: "the password cannot be the same as the email of the user",
    path: ["password"],
  })
  .refine((data) => data.firstName !== data.email, {
    message: "the firstName of the user cannot be the same as the email",
    path: ["firstName"],
  })
  .refine((data) => data.lastName !== data.email, {
    message: "the lastName of the user cannot be the same as the email",
    path: ["lastName"],
  });

  export const LoginFormSchema = z.object({
    email: z.string().email({
      message: "Invalid email",
    }),
    password: z.string().min(6, {
      message: "the password must have at least 6 characters",
    }).refine((value) => !/\s/.test(value), {
      message: "the password must not contain spaces",
    }),
  }).refine((data) => data.password !== data.email, {
    message: "the password cannot be the same as the email of the user",
    path: ["password"],
  });