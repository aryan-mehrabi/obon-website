import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcrypt";
import type { NextRequest } from "next/server";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as z from "zod";

import { getDictionary, getLocale } from "@/lib/locale";
import { credentialsSchema } from "@/lib/validations";
import prisma from "@/prisma/client";
import { User } from "@/types/next-auth";

const authOptions: AuthOptions = {
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
      async authorize(credentials, req) {
        const newReq = new Request(req.headers!.referer as string, {
          method: req.method,
          headers: req.headers,
          body: JSON.stringify(req.body),
        }) as NextRequest;

        const locale = getLocale(newReq);
        const { errors } = await getDictionary(locale);

        try {
          credentialsSchema.parse(credentials);
          const user = await prisma.user.findUnique({
            where: {
              email: credentials?.email,
            },
          });
          if (!user) {
            throw new Error(errors.register);
          }
          if (
            await bcrypt.compare(
              credentials?.password as string,
              user.password!,
            )
          ) {
            const { password: _, ...userData } = user;
            return userData;
          }
          throw new Error(errors.wrong_password);
        } catch (error) {
          if (error instanceof z.ZodError) {
            throw new Error(JSON.stringify(error.issues));
          } else {
            throw new Error(JSON.stringify((error as Error).message));
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

export default authOptions;
