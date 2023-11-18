"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import * as z from "zod";

import authOptions from "@/app/api/auth/[...nextauth]/authOptions";
import { hashPassword, serverActionMiddleware } from "@/lib/helpers";
import { getDictionary, getLocale } from "@/lib/locale";
import { registerFormSchema } from "@/lib/validations";
import prisma from "@/prisma/client";

const createRequest = (header: Headers, body = {}): NextRequest => new Request(header.get("referer")!, {
  method: "POST",
  headers: header,
  body: JSON.stringify(body),
}) as NextRequest;

export const registerUser = serverActionMiddleware(
  async (values: z.infer<typeof registerFormSchema>) => {
    const session = await getServerSession(authOptions);
    if (session) redirect("/");
    const requestHeader = headers();
    const locale = getLocale(createRequest(requestHeader));
    const { errors } = await getDictionary(locale);

    registerFormSchema.parse(values);

    const user = await prisma.user.findUnique({
      where: {
        email: values.email,
      },
    });

    if (user) {
      throw new Error(errors.user_exist);
    }

    const password = await hashPassword(values.password);
    await prisma.user.create({
      data: {
        email: values.email,
        password,
      },
    });
    return redirect("/login");
  },
);
