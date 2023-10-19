import NextAuth, { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import { hashPassword } from "@/lib/helpers";
import { credentialsSchema } from "@/lib/validations/auth";
import { User } from "@/types/next-auth";
import * as z from "zod";
import prisma from "@/prisma/client";
import bcrypt from "bcrypt";

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    CredentialsProvider({
      name: "Email",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "example@example.com",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        try {
          credentialsSchema.parse(credentials);
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
          if (!user) {
            throw new Error("Please register first");
          }
          if (await bcrypt.compare(credentials?.password!, user.password!)) {
            const { password, ...userData } = user;
            return userData;
          } else {
            throw new Error("Wrong password");
          }
        } catch (error) {
          if (error instanceof z.ZodError) {
            throw new Error(JSON.stringify(error.issues));
          } else {
            throw new Error(JSON.stringify(error));
          }
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
    maxAge: 60 * 60 * 24 * 30,
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.user = user as User;
      }
      return token;
    },
    session({ session, token }) {
      session.user = token.user;
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
