import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Icon from "@/components/atoms/Icon";
import QuantityInput from "@/components/atoms/QuantityInput";
import { getDictionary, Locale } from "@/lib/locale";
import prisma from "@/prisma/client";

import CartIcon from "../../../../../../public/carticon.svg";
import SampleProduct from "../../../../../../public/sample-product.png";

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
      productDetail: {
        quantity, disclaimer, specifications, addCart,
      },
    },
  } = dict;
  return (
    <section className="mt-28 mb-10 space-y-5 p-3 md:grid md:grid-cols-2 md:gap-x-12 max-w-5xl mx-auto">
      <div>
        <Image
          src={product.images[0].url || SampleProduct}
          alt="sample pic"
          className="h-80 w-auto mx-auto"
          width={product.images[0].width!}
          height={product.images[0].height!}
        />
      </div>
      <div className="space-y-5 row-span-2">
        <div>
          <Heading type="h3">{product[`title_${lang}`]}</Heading>
        </div>
        <div className="grid grid-cols-2 items-center md:flex md:justify-between">
          <p className="text-2xl text-eprimary font-semibold">
            {product.price}
          </p>
          <div className="flex flex-col gap-2">
            <p>{quantity}</p>
            <QuantityInput />
          </div>
        </div>
        <div>
          <Button className="w-full flex justify-center items-center gap-1">
            {addCart}
            <Icon render={CartIcon as React.FC} />
          </Button>
        </div>
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
    </section>
  );
}
