import { Locale } from "@prisma/client";
import { useParams } from "next/navigation";
import React from "react";

import Image from "@/components/atoms/Image";
import QuantityInput from "@/components/atoms/QuantityInput";
import useStore from "@/hooks/useStore";
import { formatNumber } from "@/lib/utils";
import { usePresistStore } from "@/store";
import { CartItem, ProductWithImage } from "@/types";

interface PropTypes {
  cartItem: CartItem;
  productItem: ProductWithImage;
}

export default function CartListItem({ cartItem, productItem }: PropTypes) {
  const { lang }: { lang: Locale } = useParams();
  const { removeProduct, updateProduct } = useStore(usePresistStore, (state) => state) || {};
  const defaultImage = productItem.images.find(
    (imageItem) => imageItem.is_default,
  );
  const onChangeQuantity = (prodQuantity: number, productId: number) => {
    if (!prodQuantity) {
      removeProduct?.(productId);
    } else {
      updateProduct?.(productId, prodQuantity);
    }
  };
  return (
    <tr key={cartItem.productId} className="border-b-[1px]">
      <td className="flex items-center mx-3 w-min gap-1">
        <div className="w-24 md:w-40">
          <Image
            src={defaultImage?.url}
            width={defaultImage?.width}
            height={defaultImage?.height}
            alt="sample product"
            className="w-full h-full"
          />
        </div>
        <h5 className="text-lg font-semibold">
          {productItem[`title_${lang}`]}
        </h5>
      </td>
      <td className="mx-3">{formatNumber(productItem.price)}</td>
      <td className="mx-3">
        <QuantityInput
          onChange={(prodQuantity) => onChangeQuantity(prodQuantity, productItem.id)}
          availableQuantity={productItem.quantity}
          initQuantity={cartItem.quantity}
        />
      </td>
      <td className="mx-3 hidden md:table-cell">
        {formatNumber(cartItem.quantity * productItem.price)}
      </td>
    </tr>
  );
}
