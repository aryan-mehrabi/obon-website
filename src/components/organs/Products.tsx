import { Image, Product } from "@prisma/client";
import React from "react";
import { twMerge } from "tailwind-merge";

import ProductCard from "@/components/molecules/ProductCard";
import { Locale } from "@/lib/locale";

interface PropTypes extends React.HTMLAttributes<HTMLElement> {
  lang: Locale;
  products: (Product & {
    images: Image[];
  })[];
}

export default function Products({
  className = "",
  products,
  lang,
}: PropTypes) {
  return (
    <div
      className={twMerge(`grid grid-cols-1 md:grid-cols-4 gap-5 ${className}`)}
    >
      {products.map((product) => (
        <ProductCard key={product.id} product={product} lang={lang} />
      ))}
    </div>
  );
}
