import { Image as ProductImage, Product } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
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
    <Link href={`/product/${product.id}`}>
      <div className="shadow-sm rounded p-3 bg-white">
        <div className="-mt-4 mb-2 h-[250px] overflow-hidden">
          <Image
            alt="sample product image"
            src={product.images[0]?.url || "/sample-product.png"}
            width={product.images[0]?.width || 3000}
            height={product.images[0]?.height || 2250}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="font-[500]">{product[`title_${lang}`]}</p>
        <p className="rtl:text-left text-right text-eprimary font-semibold">
          $
          {product.price}
        </p>
      </div>
    </Link>
  );
}
