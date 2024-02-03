"use server";

import { UploadApiResponse } from "cloudinary";
import { revalidateTag } from "next/cache";

import { getBuffer, serverActionMiddleware, uploadImages } from "@/lib/helpers";
import prisma, { bulkUpdate } from "@/prisma/client";
import { ProductFormSchema } from "@/types";

type ItemWithId<T> = T & { id: number };

const doesIncludeId = <T>(item: T): item is ItemWithId<T> => !!(item as ItemWithId<T>).id;

const filterNumbers = (imageId: number | string): imageId is number => typeof imageId === "number";

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
    const { metadata, ...productData } = data;
    await prisma.product.create({
      data: {
        ...productData,
        metadata: {
          createMany: {
            data: metadata,
          },
        },
        images: {
          create: imagesData,
        },
      },
    });
    revalidateTag("products");
  },
);

export const updateProduct = serverActionMiddleware(
  async (formData: FormData, id?: number) => {
    if (!id) throw new Error("no id provided");

    // Parse form data
    const data = JSON.parse(
      formData.get("data") as string,
    ) as unknown as Partial<ProductFormSchema>;

    // Upload images if any exists
    const files = formData.getAll("files") as File[];
    let uploadedImages: UploadApiResponse[];
    if (files) {
      const buffers = await getBuffer(files);
      uploadedImages = await uploadImages(files, buffers);
    }

    const { images, metadata, ...productData } = data;

    // Filter images that has id (meaning exists in db)
    const imagesId = images?.map((image) => image.id).filter(filterNumbers);
    // Find the default image
    const defaultImage = images?.find((image) => image.is_default);
    // Filter images that doesn't have id (doesn't exist in db)
    const newImages = images
      ?.filter((image) => !filterNumbers(image.id))
      .map((image, i) => ({
        is_default: image.is_default,
        url: uploadedImages[i].url,
        width: uploadedImages[i].width,
        height: uploadedImages[i].height,
      }));

    // Update the product data and images and metadata(if its creation of metadata)
    const productUpdate = prisma.product.update({
      where: {
        id,
      },
      data: {
        ...productData,
        images: images?.length
          ? {
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
              data: newImages!,
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
          }
          : undefined,
        metadata:
          metadata && metadata.filter((curr) => !doesIncludeId(curr)).length
            ? {
              createMany: {
                data: metadata?.filter((curr) => !doesIncludeId(curr)),
              },
            }
            : undefined,
      },
      include: {
        images: true,
        metadata: true,
      },
    });

    // Filter metadata that exists in db
    const metadataUpdates = metadata?.filter(doesIncludeId);
    const promises: Promise<unknown>[] = [productUpdate];
    if (metadataUpdates?.length) {
      promises.push(bulkUpdate("Metadata", metadataUpdates));
    }
    await Promise.all(promises);
    revalidateTag("products");
  },
);

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
    revalidateTag("products");
  },
);

export const deleteProduct = serverActionMiddleware(
  async (productId: number) => {
    await prisma.product.delete({
      where: {
        id: productId,
      },
    });
    revalidateTag("products");
  },
);
