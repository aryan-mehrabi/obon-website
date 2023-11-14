"use client";

import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import CartIcon from "@/assets/carticon.svg";
import Button from "@/components/atoms/Button";
import Icon from "@/components/atoms/Icon";
import QuantityInput from "@/components/atoms/QuantityInput";
import dictEn from "@/dictionaries/en.json";
import { useStore } from "@/store";

interface PropTypes {
  availableQuantity: number;
  dict: typeof dictEn;
}

export default function AddToCart({ dict, availableQuantity }: PropTypes) {
  const [isHydrated, setIsHydrated] = useState(false);
  const { productId } = useParams();
  const {
    cart, addProduct, removeProduct, updateProduct,
  } = useStore(
    (state) => state,
  );
  const cartItem = cart[productId as string];
  const {
    pages: {
      productDetail: { addCart },
    },
  } = dict;

  useEffect(() => {
    setIsHydrated(true);
  }, [cart]);

  const onChangeQuantity = (quantity: number) => {
    if (!quantity) {
      removeProduct(+productId);
    } else {
      updateProduct(+productId, quantity);
    }
  };

  return (
    isHydrated && (
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
            onClick={() => addProduct(+productId)}
          >
            {addCart}
            <Icon render={CartIcon as React.FC} />
          </Button>
        )}
      </div>
    )
  );
}
