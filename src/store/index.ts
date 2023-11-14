import { create } from "zustand";
import { persist } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";

import { Cart } from "@/types";

interface CartStore {
  addProduct: (productId: number) => void;
  cart: Cart;
  removeProduct: (productId: number) => void;
  updateProduct: (productId: number, quantity: number) => void;
}

export const useStore = create<CartStore>()(
  persist(
    immer((set) => ({
      cart: {},
      addProduct: (productId) => set((state) => {
        state.cart[productId] = {
          productId,
          quantity: 1,
        };
      }),
      updateProduct: (productId, quantity) => set((state) => {
        state.cart[productId].quantity = quantity;
      }),
      removeProduct: (productId) => {
        set((state) => {
          const { [productId]: _, ...rest } = state.cart;
          return { cart: rest };
        });
      },
    })),
    {
      name: "cart",
    },
  ),
);
