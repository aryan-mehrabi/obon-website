"use server";

import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
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
    const data = JSON.parse(formData.get("data") as string) as unknown as Omit<
      z.infer<typeof newProductFormSchema>,
      "images"
    >;
    const {
      width, height, length, ...productData
    } = data;
    const dimensions = {
      width,
      height,
      length,
    };
    const buffers = await getBuffer(images);
    const [fileNames, imagesDim] = await Promise.all([
      uploadImages(images, buffers, "public/uploads/"),
      Promise.all(buffers.map((buffer) => sharp(buffer).metadata())),
    ]);

    const imagesData = fileNames.map((fileName, i) => ({
      url: `/uploads/${fileName}`,
      width: imagesDim[i].width!,
      height: imagesDim[i].height!,
      is_default: true,
    }));

    await prisma.product.create({
      data: {
        ...productData,
        dimensions,
        images: {
          create: imagesData,
        },
      },
    });
    revalidatePath("/dashboard/products");
  },
);
