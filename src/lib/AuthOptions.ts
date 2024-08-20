import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";


export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "a@example.com" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials || {};

        // Validar que las credenciales no estén vacías
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const userFound = await prisma.user.findUnique({
          where: { email },
        });

        if (!userFound) {
          throw new Error("No user found with this email.");
        }

        const passwordValid = await bcrypt.compare(
          password,
          userFound.password
        );

        if (!passwordValid) {
          throw new Error("Password is not valid");
        }

        return {
          id: String(userFound.id),
          nombre: userFound.nombre,
          apellido: userFound.apellido,
          email: userFound.email,
          nivel: userFound.nivel,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user) {
        token.id = user.id; // Agregar ID del usuario al token
        token.nombre = user.nombre; // Agregar nombre del usuario al token
        token.apellido = user.apellido; // Agregar apellido del usuario al token
        token.email = user.email; // Agregar email del usuario al token
        token.nivel = user.nivel; // Agregar nivel del usuario al token
      }
      return token;
    },
    async session({session, token}) {
      session.user.id = token.id; // Agregar ID del usuario a la sesión
      session.user.nombre = token.nombre; // Agregar nombre del usuario a la sesión
      session.user.apellido = token.apellido; // Agregar apellido del usuario a la sesión
      session.user.email = token.email; // Agregar email del usuario a la sesión
      session.user.nivel = token.nivel; // Agregar nivel del usuario a la sesión
      return session;
    },
  },
  pages: {
    signIn: "/pages/auth/login",
  },
};