import { notFound } from "next/navigation";
import React from "react";

import Heading from "@/components/atoms/Heading";
import Image from "@/components/atoms/Image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { getDictionary, Locale } from "@/lib/locale";
import { formatNumber } from "@/lib/utils";
import prisma from "@/prisma/client";
import { Dimension } from "@/types";

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

  if (!product || !product.is_visible_to_user) {
    notFound();
  }

  const {
    pages: {
      productDetail: { disclaimer, specifications },
    },
    price: { currency },
  } = dict;

  const sortedImages = product.images.slice().sort((a, b) => {
    if (a.is_default) return -1;
    if (b.is_default) return 1;
    return 0;
  });

  const renderDimensions = () => {
    const {
      width: dimWidth,
      length: dimlength,
      height: dimHeight,
    } = (product.dimensions || {}) as Dimension;

    if (!dimWidth && !dimlength && !dimHeight) return null;

    const { width, height, length, title, unit } = specifications.dimensions;

    return (
      <p>
        <strong>
          {title}({unit}
          ):{" "}
        </strong>
        {dimWidth && `${width}: ${dimWidth} `}
        {dimlength && `${height}: ${dimlength} `}
        {dimHeight && `${length}: ${dimHeight}`}
      </p>
    );
  };

  return (
    <main className="mt-28 mb-10 space-y-5 p-3 md:grid md:grid-cols-2 md:gap-x-12 max-w-5xl mx-auto">
      {/* <div>
        <Image
          src={defaultImage?.url}
          width={defaultImage?.width}
          height={defaultImage?.height}
          alt="sample pic"
          className="w-full h-full mx-auto"
        />
      </div> */}
      <Carousel opts={{ direction: lang === "fa" ? "rtl" : "ltr" }}>
        <CarouselContent>
          {sortedImages.map((image) => (
            <CarouselItem key={image.id}>
              <Image
                src={image?.url}
                width={image?.width}
                height={image?.height}
                alt="sample pic"
                className="w-full h-full mx-auto"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
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
              {product[`description_${lang}`] && (
                <>
                  <strong>{specifications.description}: </strong>
                  {product[`description_${lang}`]}
                </>
              )}
            </li>
            <li>{renderDimensions()}</li>
            <li>
              {product[`material_${lang}`] && (
                <>
                  <strong>{specifications.material}: </strong>
                  {product[`material_${lang}`]}
                </>
              )}
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

export const dynamic = "force-dynamic";
