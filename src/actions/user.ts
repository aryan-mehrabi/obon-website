"use server";

import { headers } from "next/headers";
import * as z from "zod";

import {
  createNextRequest,
  hashPassword,
  serverActionMiddleware,
} from "@/lib/helpers";
import { getDictionary, getLocale } from "@/lib/locale";
import { registerFormSchema } from "@/lib/validations";
import prisma from "@/prisma/client";

export const registerUser = serverActionMiddleware(
  async (values: z.infer<typeof registerFormSchema>) => {
    const requestHeader = headers();
    const locale = getLocale(createNextRequest(requestHeader));
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
  },
);
