import { ChevronRightIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import React from "react";

import type { Locale } from "@/lib/locale";
import { getDictionary } from "@/lib/locale";

interface PropTypes {
  params: { lang: Locale };
}

export default async function Home({ params: { lang } }: PropTypes) {
  await getDictionary(lang);
  return (
    <>
      <header className="flex justify-center items-center bg-blend-multiply bg-gray-400 bg-[url('/header-image.jpg')] bg-cover bg-no-repeat h-screen">
        <div className="text-white space-y-5 text-center m-5">
          <h1 className="text-4xl sm:text-5xl font-bold leading-tight">
            OBON WOOD
          </h1>
          <p className="sm:text-xl">Design your house with the best material</p>
          <button
            type="button"
            className="border border-white py-3 px-8 hover:bg-neutral-900 hover:bg-opacity-40"
          >
            purchase NOW
          </button>
        </div>
      </header>
      <div className="space-y-16 my-16">
        <section className="ms-8">
          <div className="flex">
            <h2
              className="relative text-5xl"
              style={{
                "writing-mode": "vertical-rl",
                marginBlockStart: "-1.5rem",
              }}
            >
              Products
            </h2>
            <div className="overflow-hidden">
              <Link href="/products">
                <div className="flex gap-2 items-center ms-10">
                  <p>All Products</p>
                  <ChevronRightIcon />
                </div>
              </Link>
              <div className="flex overflow-auto mt-1">
                <Link href="/" className="w-80 shrink-0 me-6">
                  <Image
                    width={300}
                    height={300}
                    src="/product-sample.jpg"
                    alt="product sample"
                    className="w-full "
                  />
                  <h3 className="text-2xl font-semibold my-2">Shamdoon</h3>
                  <p>
                    <span className="text-gray-400 me-3">price:</span>
                    $25
                  </p>
                </Link>
                <Link href="/" className="w-80 shrink-0 me-6">
                  <Image
                    width={300}
                    height={300}
                    src="/product-sample.jpg"
                    alt="product sample"
                    className="w-full "
                  />
                  <h3 className="text-2xl font-semibold my-2">Shamdoon</h3>
                  <p>
                    <span className="text-gray-400 mr-3">price:</span>
                    $25
                  </p>
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="mx-8 max-w-5xl lg:mx-auto">
          <div className="md:flex">
            <div className="w-full">
              <Image
                className="w-full"
                width={300}
                height={300}
                src="/product-sample.jpg"
              />
            </div>
            <div className="space-y-3 md:space-y-8 mt-3 md:mt-20 md:ms-8">
              <h2 className="text-4xl md:text-5xl">Product Name</h2>
              <p>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. In
                recusandae tempora velit sit exercitationem debitis cum eius
                necessitatibus illo? Quasi molestiae dolore vel, temporibus
                minima sapiente qui facere sunt minus.
              </p>
              <Link
                href="/"
                className="inline-block border border-black py-2 px-6"
              >
                Check it Out
              </Link>
            </div>
          </div>
        </section>
        <section>
          <div className="w-full md:flex bg-[#c7bfa8]">
            <div className="p-8 md:w-1/2 md:flex md:items-center md:justify-center md:flex-grow">
              <h2 className="text-4xl text-center">
                OUR PRODUCTS
                <br />
                SUIT YOU
              </h2>
            </div>
            <div className="w-full md:w-1/2 flex-grow">
              <Image
                className="w-full mix-blend-darken"
                alt=""
                src="/banner-product.jpg"
                width={500}
                height={300}
              />
            </div>
          </div>
        </section>
      </div>
      <footer className="py-1 bg-slate-100">
        <p className="text-center">
          Made with &lt;3 by
          <Link href="https://www.twitter.com/weirthos"> Aryan</Link>
        </p>
      </footer>
    </>
  );
}
