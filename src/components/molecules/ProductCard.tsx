import Image from "next/image";
import React from "react";

import SampleProduct from "../../../public/sample-product.png";

export default function ProductCard() {
  return (
    <div className="shadow-sm rounded p-3 bg-white">
      <div className="h-[170px] overflow-hidden -mt-4 mb-2">
        <Image alt="sample product image" src={SampleProduct} />
      </div>
      <p className="font-[500]">Spice mint</p>
      <p className="rtl:text-left text-right">$9.99</p>
    </div>
  );
}
