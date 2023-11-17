"use client";

import React from "react";
import { useQuery } from "react-query";

import { fetchProducts } from "@/api";
import en from "@/dictionaries/en.json";
import useStore from "@/hooks/useStore";
import { usePresistStore } from "@/store";

import CartListItem from "./CartListItem";

interface PropTypes {
  dict: typeof en;
}

export default function CartList({ dict }: PropTypes) {
  const cart = useStore(usePresistStore, (state) => state.cart);
  const cartArr = Object.values(cart || {});
  const {
    pages: {
      cart: {
        table: {
          price, product, quantity, total,
        },
      },
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

  const renderCartItems = () => cartArr.map((cartItem) => {
    const productItem = products.find(
      (prod) => cartItem.productId === prod.id,
    );
    if (!productItem) return null;
    return (
      <CartListItem
        key={cartItem.productId}
        cartItem={cartItem}
        productItem={productItem}
      />
    );
  });

  return (
    <table className="table-auto text-left rtl:text-right w-full mx-auto max-w-5xl border-spacing-8">
      <thead>
        <tr className="border-b-[1px]">
          <th className="pb-4">{product.title}</th>
          <th className="pb-4">{`${price.title} (${currency})`}</th>
          <th className="pb-4">{quantity.title}</th>
          <th className="pb-4 hidden md:table-cell">{`${total.title} (${currency})`}</th>
        </tr>
      </thead>
      <tbody>{renderCartItems()}</tbody>
    </table>
  );
}
