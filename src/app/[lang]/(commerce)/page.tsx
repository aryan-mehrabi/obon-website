import { Locale } from "@prisma/client";
import Link from "next/link";
import React from "react";

import Mockups from "@/assets/mockups.png";
import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Image from "@/components/atoms/Image";
import List from "@/components/atoms/List";
import Header from "@/components/organs/Header";
import Products from "@/components/organs/Products";
import { getProducts } from "@/data/product";
import { getDictionary } from "@/lib/locale";
import { ProductWithImage } from "@/types";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const [dict, products] = await Promise.all([
    getDictionary(lang),
    getProducts({
      take: 4,
      where: {
        is_visible_to_user: true,
      },
      include: {
        images: true,
      },
    }) as unknown as ProductWithImage[],
  ]);

  const {
    pages: {
      home: { product, benefits },
    },
  } = dict;

  return (
    <div className="flex flex-col">
      <Header className="overflow-auto" lang={lang} />
      <section className="my-16 mx-5 max-w-5xl md:mx-auto">
        <div className="text-center space-y-2 mb-14">
          <Heading type="h2">{product.title}</Heading>
          <p className="text-[#5E6E89] text-xl">{product.description}</p>
        </div>
        <Products lang={lang} products={products} />
        <div className="text-center mt-12">
          <Link href={product.cta.href}>
            <Button>{product.cta.title}</Button>
          </Link>
        </div>
      </section>
      <section className="my-16 space-y-10 max-w-5xl md:mx-auto md:grid md:grid-cols-2 md:gap-x-5">
        <div className="text-center mx-4 space-y-4 md:text-left md:rtl:text-right">
          <Heading type="h2">{benefits.title}</Heading>
          <p className="text-eprimary">{benefits.description}</p>
        </div>
        <div className="row-span-2">
          <Image
            alt="two candleaf candles with a background of a flower"
            src={Mockups}
          />
        </div>
        <div className="mx-5 md:mx-auto">
          <List className="text-xl">
            {benefits.benefit_list.map(({ id, title, description }) => (
              <li key={id}>
                <strong>
                  {title}
                  :
                </strong>
                {description}
              </li>
            ))}
          </List>
        </div>
        <div className="text-center md:text-left md:rtl:text-right">
          <Link href={benefits.cta.href}>
            <Button>{benefits.cta.title}</Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
