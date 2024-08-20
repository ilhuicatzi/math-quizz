import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {

  interface User {
    id: string;
    nombre: string;
    apellido: string;
    email: string;
    nivel: string;
  }

  interface Session {
    user: {
        id: string;
        nombre: string;
        apellido: string;
        email: string;
        nivel: string;
    }
  }
}

  
  declare module "next-auth/jwt" {
    interface JWT {

        id: string;
        nombre: string;
        apellido: string;
        email: string;
        nivel: string;
    }
  }