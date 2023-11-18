/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-return */
import "server-only";

import bcrypt from "bcrypt";
import { isNotFoundError } from "next/dist/client/components/not-found";
import { isRedirectError } from "next/dist/client/components/redirect";
import * as z from "zod";

import en from "@/dictionaries/en.json";
import { ErrorResponse, SuccessResponse } from "@/types";

export const hashPassword = async (password: string): Promise<string> => {
  const SALTROUND = 10;
  return bcrypt.hash(password, SALTROUND);
};

export const errorResponse = (message: string): ErrorResponse => ({
  success: false,
  message,
});

export const successResponse = <T>(data: T | null = null): SuccessResponse => ({
  success: true,
  data,
});

export const serverActionMiddleware = <T extends (...args: any[]) => any>(fn: T) => async (...args: Parameters<T>): Promise<ErrorResponse | SuccessResponse> => {
  try {
    return await fn(...args);
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
