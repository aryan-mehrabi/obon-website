import { HamburgerMenuIcon, PersonIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { Locale } from "@/lib/locale";
import { getDictionary } from "@/lib/locale";

import CartIcon from "../../../public/carticon.svg";

export default async function Home({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const {
    pages: { home },
  } = await getDictionary(lang);
  const { header, product, benefits, footer } = home;
  return (
    <div className="flex flex-col">
      <header className="bg-[url('/header-image.jpg')] bg-cover overflow-auto">
        <nav className="bg-white flex items-center justify-between p-7 fixed w-full z-10">
          <HamburgerMenuIcon className="w-8 h-8" />
          <h3 className="text-2xl font-bold absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            Candleaf
          </h3>
          <div className="flex gap-3">
            <PersonIcon className="w-8 h-8" />
            <CartIcon className="w-8 h-8" />
          </div>
        </nav>
        <div className="bg-white backdrop-blur-md bg-opacity-80 my-64 mx-3 text-center p-10">
          <h1 className="text-4xl leading-tight font-semibold mb-3">
            🌱
            <br />
            {header.title}
          </h1>
          <p className="text-[18px]">{header.description}</p>
          <button
            type="button"
            className="mt-9 w-full bg-eprimary p-2 text-white rounded-sm"
          >
            {header.cta}
          </button>
        </div>
      </header>
      <section className="my-16 mx-5">
        <div className="text-center space-y-2 mb-14">
          <h2 className="text-4xl font-semibold">{product.title}</h2>
          <p className="text-[#5E6E89] text-xl">{product.description}</p>
        </div>
        <div className="flex flex-col gap-5">
          <div className="shadow-sm rounded p-3 bg-white">
            <div className="h-[170px] overflow-hidden -mt-4 mb-2">
              <Image
                alt="sample product image"
                width={3000}
                height={2250}
                src="/sample-product.png"
              />
            </div>
            <p className="font-[500]">Spice mint</p>
            <p className="rtl:text-left text-right">$9.99</p>
          </div>
          <div className="shadow-sm rounded p-3 bg-white">
            <div className="h-[170px] overflow-hidden -mt-4 mb-2">
              <Image
                alt="sample product image"
                width={3000}
                height={2250}
                src="/sample-product.png"
                className=""
              />
            </div>
            <p className="font-[500]">Spice mint</p>
            <p className="rtl:text-left text-right">$9.99</p>
          </div>
        </div>
        <div className="text-center mt-12">
          <button
            className="bg-eprimary text-white px-11 py-2 rounded-sm"
            type="button"
          >
            {product.cta}
          </button>
        </div>
      </section>
      <section className="my-16 space-y-10">
        <div className="text-center mx-4 space-y-4">
          <h2 className="font-bold text-4xl">{benefits.title}</h2>
          <p className="text-eprimary">{benefits.description}</p>
        </div>
        <div>
          <Image alt="" width={1380} height={964} src="/mockups.png" />
        </div>
        <div className="mx-5">
          <ul className="list-image-[url('/checkmark-circle-outline.svg')] list-outside ps-8 text-xl flex flex-col gap-5">
            {benefits.benefit_list.map(({ title, description }) => (
              <li>
                <strong>{title}:</strong>
                {description}
              </li>
            ))}
          </ul>
        </div>
        <div className="text-center">
          <button
            type="button"
            className="bg-eprimary text-white px-11 py-2 rounded-sm"
          >
            {benefits.cta}
          </button>
        </div>
      </section>
      <footer className="bg-esecondary text-white py-10 px-4 relative">
        <hr />
        <div className="mt-4 mb-12">
          <h3 className="text-3xl font-semibold mb-3">{footer.title}</h3>
          <p>{footer.description}</p>
        </div>
        <div className="grid grid-cols-2 gap-y-10 mb-16">
          {footer.menu.map(({ title, links }) => (
            <div>
              <h4 className="text-eprimary font-[500] mb-5">{title}</h4>
              <ul className="flex flex-col gap-4">
                {links.map(({ title: linkTitle, href }) => (
                  <li>
                    <Link href={href}>{linkTitle}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="bg-white text-black absolute w-full bottom-0 left-0 text-center p-4">
          <p>{footer.bottom}</p>
        </div>
      </footer>
    </div>
  );
}
