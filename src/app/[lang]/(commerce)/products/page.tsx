import { Locale } from "@prisma/client";
import React from "react";

import Heading from "@/components/atoms/Heading";
import Products from "@/components/organs/Products";
import { getProducts } from "@/data/product";
import { getDictionary } from "@/lib/locale";
import { TCategory, TImage, TProduct } from "@/types";

interface PropTypes {
  params: {
    lang: Locale;
  };
  searchParams: {
    categories?: string;
  };
}

export default async function page({
  params: { lang },
  searchParams,
}: PropTypes) {
  const categories = searchParams.categories
    ?.split(",")
    .map((id) => +id)
    .filter((id) => id);

  const [dict, products] = await Promise.all([
    getDictionary(lang),
    getProducts({
      where: {
        is_visible_to_user: true,
        categories: categories?.length
          ? {
            some: {
              id: {
                in: categories,
              },
            },
          }
          : undefined,
      },
      include: {
        images: true,
        categories: true,
      },
    }) as unknown as TProduct<TImage & TCategory>[],
  ]);

  // prettier-ignore
  const filteredProducts = categories
    ? products.filter((product) => (
      categories.every((id) => (
        product.categories.some((category) => id === category.id)))))
    : products;

  const {
    pages: {
      products: { description, title },
    },
  } = dict;

  return (
    <section className="mt-32 mb-8 p-4 space-y-10 max-w-5xl mx-auto">
      <div className="text-center">
        <Heading type="h2">{title}</Heading>
        <p>{description}</p>
      </div>
      <Products lang={lang} products={filteredProducts} />
    </section>
  );
}
