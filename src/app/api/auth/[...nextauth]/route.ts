import NextAuth, { AuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "@/lib/prisma"
import bcrypt from "bcrypt"

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: "Email", type: "email", placeholder: "example@email.com" },
        password: { label: "Password", type: "password", placeholder: "********"}
      },
      async authorize(credentials: any, req) {
        const { email, password } = credentials

        const userFound = await prisma.user.findFirst({
          where: {
            email: email
          }
        })

        if (!userFound) {
          throw new Error('No user found')
        }

        const passwordMatch = await bcrypt.compare(password, userFound.password)

        if (!passwordMatch) {
          throw new Error('Password does not match')
        }

        return {
          id: userFound.id.toString(),
          name: userFound.nombre,
          email: userFound.email
        }
      },
    })
  ],
  callbacks: {
    async jwt({ token, user, account, profile }) {
      console.log({token: token, user: user})

      if(user){
        token.id = user.id
      }

      return token
    },
    async session({ session, token, user }) {
      if(token){
        session.user.id = token.sub as string
      }
      
      console.log(session)

      return session
    }
  },
  pages: {
    signIn: '/pages/auth/login',
  },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }