"use server";

import { Prisma } from "@prisma/client";
import { UploadApiResponse } from "cloudinary";
import { revalidatePath } from "next/cache";

import { getBuffer, serverActionMiddleware, uploadImages } from "@/lib/helpers";
import prisma from "@/prisma/client";
import { ProductFormSchema } from "@/types";

export const updateProductVisibile = serverActionMiddleware(
  async (id: number, data: boolean) => {
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        is_visible_to_user: data,
      },
    });
    revalidatePath("/dashboard/products");
  },
);

export const createProduct = serverActionMiddleware(
  async (formData: FormData) => {
    const images = formData.getAll("files") as File[];
    const data = JSON.parse(
      formData.get("data") as string,
    ) as unknown as ProductFormSchema;

    const buffers = await getBuffer(images);
    const uploadedFiles = await uploadImages(images, buffers);

    const imagesData = data.images.map((image) => {
      const index = images.findIndex((val) => val.name === image.id);
      return {
        url: uploadedFiles[index].url,
        width: uploadedFiles[index].width,
        height: uploadedFiles[index].height,
        is_default: image.is_default,
      };
    });

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

export const updateProduct = serverActionMiddleware(
  async (formData: FormData, id?: number) => {
    if (!id) throw new Error("Wrong Id");

    const data = JSON.parse(
      formData.get("data") as string,
    ) as unknown as ProductFormSchema;
    const files = formData.getAll("files") as File[];
    let uploadedImages: UploadApiResponse[];
    if (files) {
      const buffers = await getBuffer(files);
      uploadedImages = await uploadImages(files, buffers);
    }

    const filterNumbers = (imageId: number | string): imageId is number => typeof imageId === "number";
    const { images, ...otherData } = data;
    const imagesId = images.map((image) => image.id).filter(filterNumbers);

    const defaultImage = images.find((image) => image.is_default);

    const newImages = images
      .filter((image) => !filterNumbers(image.id))
      .map((image, i) => ({
        is_default: image.is_default,
        url: uploadedImages[i].url,
        width: uploadedImages[i].width,
        height: uploadedImages[i].height,
      }));
    await prisma.product.update({
      where: {
        id,
      },
      data: {
        ...otherData,
        dimensions: otherData.dimensions as
          | Prisma.InputJsonValue
          | Prisma.NullableJsonNullValueInput,
        images: {
          deleteMany: {
            id: {
              notIn: imagesId,
            },
          },
          updateMany: {
            where: {
              is_default: true,
            },
            data: {
              is_default: false,
            },
          },
          createMany: {
            data: newImages,
          },
          update:
            defaultImage && typeof defaultImage.id === "number"
              ? {
                where: {
                  id: defaultImage.id,
                },
                data: {
                  is_default: true,
                },
              }
              : undefined,
        },
      },
      include: {
        images: true,
      },
    });
    revalidatePath(`/dashboard/${id}/edit`);
  },
);
