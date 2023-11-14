import { User as schemaUser } from "@prisma/client";

export type User = Omit<schemaUser, "password">;

export interface CartItem {
  productId: number;
  quantity: number;
}

export interface Cart {
  [key: string]: CartItem;
}
