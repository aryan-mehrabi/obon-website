import Link from "next/link";
import React from "react";

import Heading from "@/components/atoms/Heading";
import { getDictionary, type Locale } from "@/lib/locale";

import CartCheckout from "./CartCheckout";
import CartList from "./CartList";

interface PropTypes {
  params: {
    lang: Locale;
  };
}

export default async function page({ params: { lang } }: PropTypes) {
  const dict = await getDictionary(lang);
  const {
    pages: {
      cart: { title, backShopping },
    },
  } = dict;

  return (
    <main className="mt-24 mb-16 px-3">
      <div className="text-center my-20">
        <Heading type="h3">{title}</Heading>
        <Link
          href={backShopping.href}
          className="underline text-eprimary mt-2 p-1 inline-block"
        >
          {backShopping.title}
        </Link>
      </div>
      <CartList dict={dict} />
      <CartCheckout dict={dict} />
    </main>
  );
}
