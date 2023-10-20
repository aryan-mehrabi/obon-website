import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";
import prisma from "@/prisma/client";
import * as z from "zod";
import { credentialsSchema } from "@/lib/validations";
import { hashPassword } from "@/lib/helpers";
import { redirect } from "next/navigation";
import { getDictionary, getLocale } from "@/lib/locale";
import type { NextRequest } from "next/server";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

  const locale = getLocale(request);
  const { errors } = await getDictionary(locale);
  const data = await request.json();

  try {
    credentialsSchema.parse(data);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(
        JSON.stringify({
          success: false,
          message: error.issues.reduce(
            (error, { message }) => error + "\n " + message,
            ""
          ),
        }),
        {
          status: 400,
        }
      );
    }
  }
  const user = await prisma.user.findUnique({
    where: {
      email: data.email,
    },
  });

  if (user) {
    return new Response(
      JSON.stringify({
        success: false,
        message: errors.user_exist,
      }),
      {
        status: 400,
      }
    );
  }

  const password = await hashPassword(data.password);
  //actual registering
  const newUser = await prisma.user.create({
    data: {
      email: data.email,
      password,
    },
  });

  const { password: _, ...otherUser } = newUser;

  return Response.json({ success: true, data: otherUser });
}
