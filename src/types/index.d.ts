import { Image, Product, User as schemaUser } from "@prisma/client";

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
