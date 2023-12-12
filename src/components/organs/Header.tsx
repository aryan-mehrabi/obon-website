import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import HeaderImage from "@/assets/header-image.jpg";
import Image from "@/components/atoms/Image";
import { getDictionary, Locale } from "@/lib/locale";

import Button from "../atoms/Button";
import Heading from "../atoms/Heading";

interface PropTypes extends React.HTMLAttributes<HTMLElement> {
  lang: Locale;
}

export default async function Header({ lang, className }: PropTypes) {
  const {
    pages: {
      home: { header },
    },
  } = await getDictionary(lang);

  return (
    <header className={twMerge(`relative ${className}`)}>
      <Image
        src={HeaderImage}
        fill
        sizes="100%"
        alt="background image for candles"
        className="object-cover object-top"
        quality={100}
      />
      <div className="bg-white backdrop-blur-md bg-opacity-80 my-60 mx-3 text-center p-10 md:max-w-3xl md:mx-auto">
        <Heading type="h1">
          🌱
          <br />
          {header.title}
        </Heading>
        <p className="text-[18px]">{header.description}</p>
        <Link href={header.cta.href}>
          <Button className="mt-9">{header.cta.title}</Button>
        </Link>
      </div>
    </header>
  );
}
