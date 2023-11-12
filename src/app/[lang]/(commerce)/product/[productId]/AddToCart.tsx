"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import CartIcon from "@/assets/carticon.svg";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import QuantityInput from "@/components/atoms/QuantityInput";
import dictEn from "@/dictionaries/en.json";
import { type CartItem } from "@/types";

interface PropTypes {
  availableQuantity: number;
  dict: typeof dictEn;
}

export default function AddToCart({ dict, availableQuantity }: PropTypes) {
  const { productId } = useParams();
  const [cart, setCart] = useState<CartItem[] | undefined>(undefined);
  const cartItem = cart?.find((item) => item.productId === +productId);

  const {
    pages: {
      productDetail: { addCart },
    },
  } = dict;

  useEffect(() => {
    if (!cart) {
      setCart(
        JSON.parse(window.localStorage.getItem("cart") || "[]") as CartItem[],
      );
    } else {
      window.localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  const addToShoppingCart = (): void => {
    setCart(
      (cartItems) =>
        [
          ...(cartItems || []),
          { productId: +productId, quantity: 1 },
        ] as CartItem[],
    );
  };

  const onChangeQuantity = (quantity: number) => {
    if (!quantity) {
      setCart(cart?.filter((item) => item.productId !== +productId));
    } else {
      setCart(
        cart?.map((item) => {
          if (item.productId === +productId) {
            return {
              productId: +productId,
              quantity,
            };
          }
          return item;
        }),
      );
    }
  };

  return (
    <div>
      {cartItem ? (
        <QuantityInput
          availableQuantity={availableQuantity}
          initQuantity={cartItem?.quantity}
          onChange={onChangeQuantity}
        />
      ) : (
        <Button
          type="submit"
          className="w-full flex justify-center items-center gap-1"
          onClick={() => addToShoppingCart()}
        >
          {addCart}
          <Icon render={CartIcon as React.FC} />
        </Button>
      )}
    </div>
  );
}
