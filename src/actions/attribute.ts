"use server";

import { revalidateTag } from "next/cache";

import { serverActionMiddleware } from "@/lib/helpers";
import prisma from "@/prisma/client";
import { AttributeFormSchema } from "@/types";

export const createAttribute = serverActionMiddleware(
  async (values: AttributeFormSchema) => {
    await prisma.attribute.create({
      data: values,
    });
    revalidateTag("attributes");
    return { message: "created successfully" };
  },
);

export const updateAttribute = serverActionMiddleware(
  async (values: Partial<AttributeFormSchema>, attributeId: number) => {
    await prisma.attribute.update({
      where: {
        id: attributeId,
      },
      data: values,
    });
    revalidateTag("attributes");
    return { message: "updated successfully" };
  },
);

export const deleteAttribute = serverActionMiddleware(
  async (attributeId: number) => {
    await prisma.attribute.delete({
      where: {
        id: attributeId,
      },
    });
    revalidateTag("attributes");
  },
);
