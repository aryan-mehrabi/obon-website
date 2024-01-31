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
import { getProduct } from "@/data/product";
import { getDictionary, i18n, Locale } from "@/lib/locale";
import { formatNumber } from "@/lib/utils";
import { TAttribute, TImage, TMetadata, TProduct } from "@/types";

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
    getProduct({
      where: {
        id: +productId,
      },
      include: {
        images: true,
        metadata: {
          include: {
            attribute: true,
          },
        },
      },
    }) as unknown as TProduct<TImage & TMetadata<TAttribute>>,
  ]);

  if (!product || !product.is_visible_to_user) {
    notFound();
  }

  const {
    pages: {
      productDetail: { disclaimer },
    },
    price: { currency },
  } = dict;

  const sortedImages = product.images.slice().sort((a, b) => {
    if (a.is_default) return -1;
    if (b.is_default) return 1;
    return 0;
  });

  const renderSpecificaitons = () =>
    product.metadata
      .filter(
        (metadata) => metadata.attribute.locale === lang && metadata.value,
      )
      .map((metadata) => (
        <li key={metadata.id}>
          <strong>{metadata.attribute[`title_${lang}`]}:</strong>
          {metadata.value}
        </li>
      ));

  return (
    <main className="mt-28 mb-10 space-y-5 p-3 md:grid md:grid-cols-2 md:gap-x-12 max-w-5xl mx-auto">
      <Carousel
        opts={{ direction: i18n.rtl.some((ln) => ln === lang) ? "rtl" : "ltr" }}
      >
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
          <ul className="space-y-2">{renderSpecificaitons()}</ul>
        </div>
      </div>
      <div className="text-center">
        <Heading type="h4">{disclaimer}</Heading>
      </div>
    </main>
  );
}
