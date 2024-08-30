import NextAuth from "next-auth"
import { authOptions } from "@/middlewares/AuthOptions"


const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }