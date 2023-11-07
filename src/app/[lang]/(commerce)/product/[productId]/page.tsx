import Image from "next/image";
import React from "react";

import Button from "@/components/atoms/Button";
import Heading from "@/components/atoms/Heading";
import Icon from "@/components/atoms/Icon";
import QuantityInput from "@/components/atoms/QuantityInput";
import { getDictionary, Locale } from "@/lib/locale";

import CartIcon from "../../../../../../public/carticon.svg";
import SampleProduct from "../../../../../../public/sample-product.png";

interface PropTypes {
  params: {
    lang: Locale;
    productId: string;
  };
}

export default async function Page({ params: { lang } }: PropTypes) {
  const {
    pages: { productDetail },
  } = await getDictionary(lang);
  const {
    quantity, disclaimer, specifications, addCart,
  } = productDetail;
  return (
    <section className="mt-28 mb-10 space-y-5 p-3 md:grid md:grid-cols-2 md:gap-x-12 max-w-5xl mx-auto">
      <div className="">
        <Image
          src={SampleProduct}
          alt="sample pic"
          className="h-80 w-auto mx-auto"
        />
      </div>
      <div className="space-y-5 row-span-2">
        <div className="">
          <Heading type="h3">Spice Mint Felan</Heading>
        </div>
        <div className="grid grid-cols-2 items-center md:flex md:justify-between">
          <p className="text-2xl text-eprimary font-semibold">$9.99</p>
          <div className="flex flex-col gap-2">
            <p>{quantity}</p>
            <QuantityInput />
          </div>
        </div>
        <div className="">
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
              Top grade Soy wax that delivers a smoke less, consistent burn
            </li>
            <li>
              <strong>
                {specifications.dimensions}
                :
                {" "}
              </strong>
              Top grade Soy wax that delivers a smoke less, consistent burn
            </li>
            <li>
              <strong>
                {specifications.material}
                :
                {" "}
              </strong>
              Top grade Soy wax that delivers a smoke less, consistent burn
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
