import { getServerSession } from "next-auth/next";
import { authOptions } from "../[...nextauth]/route";
import prisma from "@/prisma/client";
import * as z from "zod";
import { credentialsSchema } from "@/lib/validations/auth";
import { hashPassword } from "@/lib/helpers";
import { redirect } from "next/navigation";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");

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
        message: "user already exists",
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
