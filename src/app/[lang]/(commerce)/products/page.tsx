import React from "react";

import Heading from "@/components/atoms/Heading";
import Products from "@/components/organs/Products";
import { type Locale } from "@/lib/locale";
import prisma from "@/prisma/client";

interface PropTypes {
  params: {
    lang: Locale;
  };
}

export default async function page({ params: { lang } }: PropTypes) {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });

  return (
    <section className="mt-32 mb-8 p-4 space-y-10 max-w-5xl mx-auto">
      <div className="text-center">
        <Heading type="h2">Products</Heading>
        <p>Order it for you or for your beloved ones </p>
      </div>
      <Products lang={lang} products={products} />
    </section>
  );
}
