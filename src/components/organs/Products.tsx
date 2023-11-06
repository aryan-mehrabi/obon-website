import React from "react";

import ProductCard from "@/components/molecules/ProductCard";

interface PropTypes extends React.HTMLAttributes<HTMLElement> {}

export default function Products({ className }: PropTypes) {
  return (
    <div className={`flex flex-col md:flex-row gap-5 ${className}`}>
      <ProductCard />
      <ProductCard />
      <ProductCard />
      <ProductCard />
    </div>
  );
}
