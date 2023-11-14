"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import QuantityInput from "@/components/atoms/QuantityInput";
import en from "@/dictionaries/en.json";
import useStore from "@/hooks/useStore";
import { Locale } from "@/lib/locale";
import { usePresistStore } from "@/store";
import { ProductWithImage } from "@/types";

interface PropTypes {
  dict: typeof en;
}

export default function ProductTable({ dict }: PropTypes) {
  const { lang }: { lang: Locale } = useParams();
  const [products, setProducts] = useState<ProductWithImage[]>([]);
  const { cart, removeProduct, updateProduct } = useStore(usePresistStore, (state) => state) || {};
  const cartArr = Object.values(cart || {});

  const {
    pages: {
      cart: {
        table: {
          price, product, quantity, total,
        },
      },
    },
  } = dict;

  useEffect(() => {
    if (cartArr.length && !products.length) {
      const id = cartArr.map((productItem) => productItem.productId).join(",");

      const url = new URL(`${process.env.NEXT_PUBLIC_BASE_URL}/api/products`);
      url.searchParams.set("id", id);

      const fetchProducts = async () => {
        const { data } = (await fetch(url).then((res) => res.json())) as {
          data: ProductWithImage[];
        };
        setProducts(data);
      };
      // eslint-disable-next-line
      fetchProducts();
    }
  }, [cartArr, products]);

  const onChangeQuantity = (prodQuantity: number, productId: number) => {
    if (!prodQuantity) {
      removeProduct?.(productId);
    } else {
      updateProduct?.(productId, prodQuantity);
    }
  };

  const renderCartItems = () => cartArr.map((cartItem) => {
    const productItem = products.find(
      (prod) => cartItem.productId === prod.id,
    );
    if (!productItem) return null;
    return (
      <tr key={cartItem.productId} className="border-b-[1px]">
        <td className="flex items-center mx-3 w-min gap-1">
          <div className="w-24 md:w-40">
            <Image
              src={productItem.images[0].url}
              alt="sample product"
              className="w-full h-full"
              width={productItem.images[0].width!}
              height={productItem.images[0].height!}
            />
          </div>
          <h5 className="text-lg font-semibold">
            {productItem[`title_${lang}`]}
          </h5>
        </td>
        <td className="mx-3">
          $
          {productItem.price}
        </td>
        <td className="mx-3">
          <QuantityInput
            onChange={(prodQuantity) => onChangeQuantity(prodQuantity, productItem.id)}
            availableQuantity={productItem.quantity}
            initQuantity={cartItem.quantity}
          />
        </td>
        <td className="mx-3 hidden md:table-cell">
          {cartItem.quantity * productItem.price}
        </td>
      </tr>
    );
  });

  return (
    <table className="table-auto text-left rtl:text-right w-full mx-auto max-w-5xl border-spacing-8">
      <thead>
        <tr className="border-b-[1px]">
          <th className="pb-4">{product.title}</th>
          <th className="pb-4">{price.title}</th>
          <th className="pb-4">{quantity.title}</th>
          <th className="pb-4 hidden md:table-cell">{total.title}</th>
        </tr>
      </thead>
      <tbody>{renderCartItems()}</tbody>
    </table>
  );
}
