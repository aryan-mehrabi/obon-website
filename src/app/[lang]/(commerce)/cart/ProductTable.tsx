"use client";

import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

import Mockup from "@/assets/mockups.png";
import QuantityInput from "@/components/atoms/QuantityInput";
import en from "@/dictionaries/en.json";
import { Locale } from "@/lib/locale";
import { useStore } from "@/store";
import { ProductWithImage } from "@/types";

interface PropTypes {
  dict: typeof en;
}

export default function ProductTable({ dict }: PropTypes) {
  const { lang }: { lang: Locale } = useParams();
  const [products, setProducts] = useState<ProductWithImage[]>([]);
  const cart = useStore((state) => state.cart);
  const cartArr = Object.values(cart);
  const removeProduct = useStore((state) => state.removeProduct);
  const updateProduct = useStore((state) => state.updateProduct);

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
    if (cartArr.length) {
      const id = cartArr.map((productItem) => productItem.productId).join(",");

      const url = new URL("http://localhost:3000/api/products");
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
  }, []);

  const onChangeQuantity = (prodQuantity: number, productId: number) => {
    if (!quantity) {
      removeProduct(productId);
    } else {
      updateProduct(productId, prodQuantity);
    }
  };

  const renderCartItems = () => cartArr.map((cartItem) => {
    const productItem = products.find(
      (prod) => cartItem.productId === prod.id,
    );
    if (!productItem) return null;
    return (
      <tr className="border-b-[1px]">
        <td className="flex items-center mx-3 w-min gap-1">
          <div className="w-24 md:w-40">
            <Image
              src={Mockup}
              alt="sample product"
              className="w-full h-full"
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
      <tbody>
        {/* <tr className="border-b-[1px]">
          <td className="flex items-center mx-3 w-min gap-1">
            <div className="w-24 md:w-40">
              <Image
                src={Mockup}
                alt="sample product"
                className="w-full h-full"
              />
            </div>
            <h5 className="text-lg font-semibold">product title</h5>
          </td>
          <td className="mx-3">$25000</td>
          <td className="mx-3">
            <QuantityInput availableQuantity={1} initQuantity={1} />
          </td>
          <td className="mx-3 hidden md:table-cell">$55000</td>
        </tr> */}
        {renderCartItems()}
      </tbody>
    </table>
  );
}
