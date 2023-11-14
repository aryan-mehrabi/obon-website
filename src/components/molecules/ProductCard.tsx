import Image from "next/image";
import Link from "next/link";
import React from "react";

import { getDictionary, type Locale } from "@/lib/locale";
import { formatNumber } from "@/lib/utils";
import { ProductWithImage } from "@/types";

interface PropTypes {
  lang: Locale;
  product: ProductWithImage;
}

export default async function ProductCard({ product, lang }: PropTypes) {
  const dict = await getDictionary(lang);
  const {
    price: { currency },
  } = dict;
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
          {`${formatNumber(product.price)} ${currency}`}
        </p>
      </div>
    </Link>
  );
}
