import {
  Attribute as AttributePrisma,
  Image as ImagePrisma,
  Metadata as MetadataPrisma,
  Product as ProductPrisma,
  User as schemaUser,
} from "@prisma/client";
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

export type TProduct<T = Record<string, never>> = ProductPrisma & T;

export type TImage = { images: ImagePrisma[] };

export type ProductWithImage = ProductPrisma & TImage;

export type TMetadata<T = Record<string, never>> = {
  metadata: (MetadataPrisma & T)[];
};

export type TAttribute = { attribute: AttributePrisma };

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

export type TFormData = {
  dirtyFields: (keyof ProductFormSchema)[];
  fields: ProductFormSchema;
};
