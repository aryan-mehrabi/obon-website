import React from "react";

import Heading from "@/components/atoms/Heading";
import Products from "@/components/organs/Products";
import { getDictionary, type Locale } from "@/lib/locale";
import prisma from "@/prisma/client";

interface PropTypes {
  params: {
    lang: Locale;
  };
}

export default async function page({ params: { lang } }: PropTypes) {
  const [dict, products] = await Promise.all([
    getDictionary(lang),
    prisma.product.findMany({
      where: {
        is_visible_to_user: true,
      },
      include: {
        images: true,
      },
    }),
  ]);

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
      <Products lang={lang} products={products} />
    </section>
  );
}
