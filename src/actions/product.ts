"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

import prisma from "@/prisma/client";

export const updateProduct = async (
  id: number,
  data: Prisma.ProductUpdateInput,
) => {
  await prisma.product.update({
    where: {
      id,
    },
    data,
  });
  revalidatePath("/dashboard/products");
};
