"use client";

import { Image, Product } from "@prisma/client";
import { useParams } from "next/navigation";
import React from "react";

import CartIcon from "@/assets/carticon.svg";
import Icon from "@/components/atoms/Icon";
import QuantityInput from "@/components/atoms/QuantityInput";
import { Button } from "@/components/ui/button";
import dictEn from "@/dictionaries/en.json";

interface CartItem {
  productId: number;
  quantity: number;
}

interface PropTypes {
  dict: typeof dictEn;
  product: Product & {
    images: Image[];
  };
}

export default function AddToCart({ product, dict }: PropTypes) {
  const {
    pages: {
      productDetail: { addCart, quantity },
    },
  } = dict;
  const addToShoppingCart = (productId: number, quantity: number): void => {
    const items: CartItem[] = JSON.parse(
      window.localStorage.getItem("cart") || "[]",
    ) as CartItem[];
    window.localStorage.setItem(
      "cart",
      JSON.stringify([...items, { productId, quantity }]),
    );
  };

  const { productId } = useParams();
  const onsubmitForm = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const quantity = (
      e.currentTarget.elements.namedItem("quantity") as HTMLInputElement
    ).value;
    addToShoppingCart(+productId, +quantity);
  };

  return (
    <>
      <div className="grid grid-cols-2 items-center md:flex md:justify-between">
        <p className="text-2xl text-eprimary font-semibold">{product.price}</p>
        <div className="flex flex-col gap-2">
          <p>{quantity}</p>
          <QuantityInput availableQuantity={product.quantity} />
        </div>
      </div>
      <div>
        <Button
          type="submit"
          className="w-full flex justify-center items-center gap-1"
        >
          {addCart}
          <Icon render={CartIcon as React.FC} />
        </Button>
      </div>
    </>
  );
}
