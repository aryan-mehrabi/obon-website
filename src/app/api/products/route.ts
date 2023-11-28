import { NextRequest } from "next/server";

import prisma from "@/prisma/client";

export const GET = async (req: NextRequest) => {
  const id = req.nextUrl.searchParams
    .get("id")
    ?.split(",")
    .filter((prodId) => prodId)
    .map((prodId) => +prodId);

  const res = await prisma.product.findMany({
    where: {
      id: {
        in: id,
      },
      is_visible_to_user: true,
    },
    include: {
      images: true,
    },
  });
  return Response.json({ data: res });
};
