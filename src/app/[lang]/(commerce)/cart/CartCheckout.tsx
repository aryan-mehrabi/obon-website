"use client";

import React from "react";
import { useQuery } from "react-query";

import { fetchProducts } from "@/api";
import Button from "@/components/atoms/Button";
import en from "@/dictionaries/en.json";
import useStore from "@/hooks/useStore";
import { formatNumber } from "@/lib/utils";
import { usePresistStore } from "@/store";

interface PropTypes {
  dict: typeof en;
}

export default function CartCheckout({ dict }: PropTypes) {
  const cart = useStore(usePresistStore, (state) => state.cart);
  const cartArr = Object.values(cart || {});
  const {
    pages: {
      cart: { cta, total, disclaimer },
    },
    price: { currency },
  } = dict;

  const id = cartArr.map((productItem) => productItem.productId).join(",");
  const { data } = useQuery({
    queryKey: ["products", id],
    queryFn: () => (id ? fetchProducts(id) : null),
    staleTime: Infinity,
  });
  if (!data) return null;
  const products = data.data;

  const calculateTotal = () => cartArr.reduce((acc, curr) => {
    const prod = products.find((prodItem) => prodItem.id === curr.productId);
    return acc + (prod?.price || 0) * curr.quantity;
  }, 0);

  return (
    <div className="text-center mt-10 md:flex md:items-start md:justify-end md:gap-20 max-w-5xl mx-auto">
      <div className="mb-9">
        <div className="flex items-center justify-center gap-6 font-semibold space-y-1">
          <p className="text-base">
            {total}
            :
          </p>
          <p className="text-xl">
            {`${formatNumber(
              calculateTotal(),
            )} ${currency}`}
          </p>
        </div>
        <p className="text-gray-400 text-sm">{disclaimer}</p>
      </div>
      <Button className="w-full md:w-auto">{cta.title}</Button>
    </div>
  );
}
