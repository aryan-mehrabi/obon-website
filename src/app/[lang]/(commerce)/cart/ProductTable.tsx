"use client";

import Image from "next/image";
import React from "react";

import Mockup from "@/assets/mockups.png";
import QuantityInput from "@/components/atoms/QuantityInput";
import en from "@/dictionaries/en.json";

interface PropTypes {
  dict: typeof en;
}

export default function ProductTable({ dict }: PropTypes) {
  const {
    pages: {
      cart: {
        table: {
          price, product, quantity, total,
        },
      },
    },
  } = dict;

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
        <tr className="border-b-[1px]">
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
        </tr>
        <tr className="border-b-[1px]">
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
        </tr>
      </tbody>
    </table>
  );
}
