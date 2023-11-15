import { notFound } from "next/navigation";
import React from "react";

import Heading from "@/components/atoms/Heading";
import Image from "@/components/atoms/Image";
import { getDictionary, Locale } from "@/lib/locale";
import { formatNumber } from "@/lib/utils";
import prisma from "@/prisma/client";

import AddToCart from "./AddToCart";

interface PropTypes {
  params: {
    lang: Locale;
    productId: string;
  };
}

export default async function Page({ params: { lang, productId } }: PropTypes) {
  const [dict, product] = await Promise.all([
    getDictionary(lang),
    prisma.product.findUnique({
      where: {
        id: +productId,
      },
      include: {
        images: true,
      },
    }),
  ]);

  if (!product) {
    notFound();
  }

  const {
    pages: {
      productDetail: { disclaimer, specifications },
    },
    price: { currency },
  } = dict;
  return (
    <main className="mt-28 mb-10 space-y-5 p-3 md:grid md:grid-cols-2 md:gap-x-12 max-w-5xl mx-auto">
      <div>
        <Image
          src={product.images[0]?.url}
          width={product.images[0]?.width}
          height={product.images[0]?.height}
          alt="sample pic"
          className="w-full h-full mx-auto"
        />
      </div>
      <div className="space-y-5 row-span-2">
        <div>
          <Heading type="h3">{product[`title_${lang}`]}</Heading>
        </div>
        <div>
          <p className="text-2xl text-eprimary font-semibold">
            {`${formatNumber(product.price)} ${currency}`}
          </p>
        </div>
        <AddToCart dict={dict} availableQuantity={product.quantity} />
        <div className="border border-neutral-200 p-5 rounded-sm ">
          <ul className="space-y-2">
            <li>
              <strong>
                {specifications.description}
                :
                {" "}
              </strong>
              {product[`description_${lang}`]}
            </li>
            <li>
              <strong>
                {specifications.dimensions}
                :
                {" "}
              </strong>
              {JSON.stringify(product.dimensions)}
            </li>
            <li>
              <strong>
                {specifications.material}
                :
                {" "}
              </strong>
              {product[`material_${lang}`]}
            </li>
          </ul>
        </div>
      </div>
      <div className="text-center">
        <Heading type="h4">{disclaimer}</Heading>
      </div>
    </main>
  );
}
