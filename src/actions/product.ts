"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import sharp from "sharp";
import * as z from "zod";

import { getBuffer, serverActionMiddleware, uploadImages } from "@/lib/helpers";
import { newProductFormSchema } from "@/lib/validations";
import prisma from "@/prisma/client";

export const updateProduct = serverActionMiddleware(
  async (id: number, data: Prisma.ProductUpdateInput) => {
    await prisma.product.update({
      where: {
        id,
      },
      data,
    });
    revalidatePath("/dashboard/products");
  },
);

export const createProduct = serverActionMiddleware(
  async (formData: FormData) => {
    const images = formData.getAll("files") as File[];
    const data = JSON.parse(
      formData.get("data") as string,
    ) as unknown as z.infer<typeof newProductFormSchema>;

    const buffers = await getBuffer(images);
    const [fileNames, imagesDim] = await Promise.all([
      uploadImages(images, buffers, "public/uploads/"),
      Promise.all(buffers.map((buffer) => sharp(buffer).metadata())),
    ]);

    const imagesData = images.map((file, i) => ({
      url: `/uploads/${fileNames[i]}`,
      width: imagesDim[i].width!,
      height: imagesDim[i].height!,
      is_default: file.name === data.images.default,
    }));

    await prisma.product.create({
      data: {
        ...data,
        dimensions: data.dimensions as
          | Prisma.InputJsonValue
          | Prisma.NullableJsonNullValueInput,
        images: {
          create: imagesData,
        },
      },
    });
    redirect("/dashboard/products");
  },
);

export const deleteProduct = serverActionMiddleware(
  async (productId: number) => {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    revalidatePath("/dashboard/products");
  },
);
