/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable max-len */
import "server-only";

import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import DatauriParser from "datauri/parser";
import { isNotFoundError } from "next/dist/client/components/not-found";
import { isRedirectError } from "next/dist/client/components/redirect";
import path from "path";
import * as z from "zod";

import en from "@/dictionaries/en.json";
import { ErrorResponse, SuccessResponse } from "@/types";

cloudinary.config({
  cloud_name: "dzmfdgasb",
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const hashPassword = async (password: string): Promise<string> => {
  const SALTROUND = 10;
  return bcrypt.hash(password, SALTROUND);
};

export const errorResponse = (message: string): ErrorResponse => ({
  success: false,
  message,
});

export const successResponse = <T>(
  data: T | null = null,
  message: string = "",
): SuccessResponse => ({
    success: true,
    message,
    data,
  });

export const serverActionMiddleware = <
    T extends (
      ...args: any[]
    ) => Promise<{ data?: unknown; message?: string } | void>,
  >(
    fn: T,
  ) => async (...args: Parameters<T>): Promise<ErrorResponse | SuccessResponse> => {
    try {
      const response = await fn(...args);
      return successResponse(response?.data, response?.message);
    } catch (error) {
      if (isRedirectError(error) || isNotFoundError(error)) {
        throw error;
      }
      if (error instanceof z.ZodError) {
        return errorResponse(
          error.issues.reduce(
            (zodError, { message }) => `${zodError}\n ${message}`,
            "",
          ),
        );
      }
      if (error instanceof Error) {
        return errorResponse(error.message);
      }
      return errorResponse(en.errors.server);
    }
  };

export const apiMiddleware = <T extends (...args: any[]) => any>(fn: T) => async (...args: Parameters<T>): Promise<Response> => {
  try {
    return await fn(...args);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json(
        errorResponse(
          error.issues.reduce(
            (zodError, { message }) => `${zodError}\n ${message}`,
            "",
          ),
        ),
        { status: 400 },
      );
    }
    if (error instanceof Error) {
      return Response.json(errorResponse(error.message));
    }
    return Response.json(errorResponse(en.errors.server));
  }
};

const parser = new DatauriParser();
const createImage = async (imgBuffer: Buffer, imgFile: File) => {
  const base64Image = parser.format(
    path.extname(imgFile.name).toString(),
    imgBuffer,
  );
  const uploadedImageResponse = await cloudinary.uploader.upload(
    base64Image.content!,
    { resource_type: "image" },
  );
  return uploadedImageResponse;
};

export const uploadImages = async (images: File[], buffers: Buffer[]) => Promise.all(images.map((_, i) => createImage(buffers[i], images[i])));

export const getBuffer = (images: File[]) => Promise.all(
  images.map(async (image) => Buffer.from(await image.arrayBuffer())),
);
