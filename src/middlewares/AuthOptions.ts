import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      id: "admin",
      name: "Admin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // Lógica de autenticación para admin
      async authorize(credentials, req) {
        const { email, password } = credentials || {};

        // Validate data 
        if (!email || !password) {
          throw new Error("Email and password are required");
        }

        const adminFound = await prisma.admin.findUnique({
          where: { email },
        });

        if (!adminFound) {
          throw new Error("No admin found with this email.");
        }

        const passwordValid = await bcrypt.compare(
          password,
          adminFound.password
        );

        if (!passwordValid) {
          throw new Error("Password is not valid");
        }

        return {
          id: String(adminFound.id),
          username: adminFound.username,
          email: adminFound.email,
          isAdmin: true,
        };
      },
    }),
    CredentialsProvider({
      id: "user",
      name: "User",
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
          isAdmin: false,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({token, user}) {
      if (user && user.isAdmin) {
        token.id = user.id; 
        token.username = user.username; 
        token.email = user.email;
        token.isAdmin = user.isAdmin;
      }else if (user && !user.isAdmin) {
        token.id = user.id; 
        token.nombre = user.nombre; 
        token.apellido = user.apellido; 
        token.email = user.email;
        token.nivel = user.nivel; 
        token.isAdmin = user.isAdmin;
      }
      return token;
    },
    async session({session, token}) {
      if (token.isAdmin) {
        session.user.id = token.id;
        session.user.username = token.username;
        session.user.email = token.email;
        session.user.isAdmin = token.isAdmin;
      }
      else {
        session.user.id = token.id;
        session.user.nombre = token.nombre;
        session.user.apellido = token.apellido;
        session.user.email = token.email;
        session.user.nivel = token.nivel;
        session.user.isAdmin = token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/pages/auth/login",
  },
};