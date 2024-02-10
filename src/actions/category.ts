"use server";

import { revalidateTag } from "next/cache";
import { headers } from "next/headers";

import { createNextRequest, serverActionMiddleware } from "@/lib/helpers";
import { getDictionary, getLocale } from "@/lib/locale";
import prisma from "@/prisma/client";
import { CategoryFormSchema } from "@/types";

export const createCategory = serverActionMiddleware(
  async (values: CategoryFormSchema) => {
    const {
      actions: {
        category: { create },
      },
    } = await getDictionary(getLocale(createNextRequest(headers())));
    await prisma.category.create({ data: values });
    revalidateTag("categories");
    return { message: create.success };
  },
);

export const updateCategory = serverActionMiddleware(
  async (values: Partial<CategoryFormSchema>, categoryId: number) => {
    const {
      actions: {
        category: { update },
      },
    } = await getDictionary(getLocale(createNextRequest(headers())));
    await prisma.category.update({
      where: {
        id: categoryId,
      },
      data: values,
    });
    revalidateTag("categories");
    return { message: update.success };
  },
);

export const deleteCategory = serverActionMiddleware(
  async (categoryId: number) => {
    const {
      actions: { category },
    } = await getDictionary(getLocale(createNextRequest(headers())));
    await prisma.category.delete({
      where: {
        id: categoryId,
      },
    });
    revalidateTag("categories");
    return { message: category.delete.success };
  },
);
