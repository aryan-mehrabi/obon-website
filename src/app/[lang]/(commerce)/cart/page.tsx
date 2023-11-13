import Link from "next/link";
import React from "react";

import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import { getDictionary, type Locale } from "@/lib/locale";

import ProductTable from "./ProductTable";

interface PropTypes {
  params: {
    lang: Locale;
  };
}

export default async function page({ params: { lang } }: PropTypes) {
  const dict = await getDictionary(lang);
  const {
    pages: {
      cart: {
        title, backShopping, disclaimer, total, cta,
      },
    },
  } = dict;

  return (
    <main className="mt-24 mb-16 mx-3">
      <div className="text-center my-20">
        <Heading type="h3">{title}</Heading>
        <Link
          href={backShopping.href}
          className="underline text-eprimary mt-2 p-1 inline-block"
        >
          {backShopping.title}
        </Link>
      </div>
      <ProductTable dict={dict} />
      <div className="text-center mt-10">
        <div className="mb-9">
          <div className="flex items-center justify-center gap-6 text-xl font-semibold space-y-1">
            <p>{total}</p>
            <p>$9.99</p>
          </div>
          <p className="text-gray-400">{disclaimer}</p>
        </div>
        <Button className="w-full">{cta.title}</Button>
      </div>
    </main>
  );
}
