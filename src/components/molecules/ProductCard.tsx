import Link from "next/link";
import React from "react";

import Image from "@/components/atoms/Image";
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

  const defaultImage = product.images.find((imageItem) => imageItem.is_default);

  return (
    <Link href={`/product/${product.id}`}>
      <div className="shadow-sm rounded p-3 bg-white">
        <div className="mb-2 h-[250px] overflow-hidden">
          <Image
            alt="sample product image"
            src={defaultImage?.url}
            width={defaultImage?.width}
            height={defaultImage?.height}
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
