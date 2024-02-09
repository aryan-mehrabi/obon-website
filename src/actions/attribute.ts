"use server";

import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

import { createNextRequest, serverActionMiddleware } from "@/lib/helpers";
import { getDictionary, getLocale } from "@/lib/locale";
import prisma from "@/prisma/client";
import { AttributeFormSchema } from "@/types";

export const createAttribute = serverActionMiddleware(
  async (values: AttributeFormSchema) => {
    const locale = getLocale(createNextRequest(headers()));
    const {
      actions: { attribute },
    } = await getDictionary(locale);
    await prisma.attribute.create({
      data: values,
    });
    revalidateTag("attributes");
    return { message: attribute.create.success };
  },
);

export const updateAttribute = serverActionMiddleware(
  async (values: Partial<AttributeFormSchema>, attributeId: number) => {
    const locale = getLocale(createNextRequest(headers()));
    const {
      actions: { attribute },
    } = await getDictionary(locale);
    await prisma.attribute.update({
      where: {
        id: attributeId,
      },
      data: values,
    });
    revalidateTag("attributes");
    return { message: attribute.update.success };
  },
);

export const deleteAttribute = serverActionMiddleware(
  async (attributeId: number) => {
    const locale = getLocale(createNextRequest(headers()));
    const {
      actions: { attribute },
    } = await getDictionary(locale);
    await prisma.attribute.delete({
      where: {
        id: attributeId,
      },
    });
    revalidateTag("attributes");
    return { message: attribute.delete.success };
  },
);
