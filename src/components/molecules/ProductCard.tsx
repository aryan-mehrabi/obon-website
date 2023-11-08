import { Image as ProductImage, Product } from "@prisma/client";
import Image from "next/image";
import React from "react";

import { type Locale } from "@/lib/locale";

interface PropTypes {
  lang: Locale;
  product: Product & {
    images: ProductImage[];
  };
}

export default function ProductCard({ product, lang }: PropTypes) {
  return (
    <div className="shadow-sm rounded p-3 bg-white">
      <div className="-mt-4 mb-2">
        <Image
          alt="sample product image"
          src={product.images[0]?.url || "/sample-product.png"}
          width={product.images[0]?.width || 3000}
          height={product.images[0]?.height || 2250}
        />
      </div>
      <p className="font-[500]">{product[`title_${lang}`]}</p>
      <p className="rtl:text-left text-right">$9.99</p>
    </div>
  );
}
