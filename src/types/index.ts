import { Image, Product, User as schemaUser } from "@prisma/client";
import * as z from "zod";

import {
  productFirstStepFormSchema,
  productFormSchema,
  productSecondStepFormSchema,
} from "@/lib/validations";

export type User = Omit<schemaUser, "password">;

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  [key: string]: CartItem;
}

export type ProductWithImage = Product & { images: Image[] };

export interface Dimension {
  height?: number;
  length?: number;
  width?: number;
}

export interface ErrorResponse {
  message: string;
  success: false;
}

export interface SuccessResponse {
  data?: unknown;
  success: true;
}

export const enum FormSteps {
  first,
  second,
}

export type ProductFirstStepFormSchema = z.infer<
  typeof productFirstStepFormSchema
>;
export type ProductSecondStepFormSchema = z.infer<
  typeof productSecondStepFormSchema
>;
export type ProductFormSchema = z.infer<typeof productFormSchema>;
