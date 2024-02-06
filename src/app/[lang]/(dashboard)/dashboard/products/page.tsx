import { Locale } from "@prisma/client";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import Heading from "@/components/atoms/Heading";
import Icon from "@/components/atoms/Icon";
import { DataTable } from "@/components/organs/DataTable";
import { Button } from "@/components/ui/button";
import { getProducts } from "@/data/product";
import { getDictionary } from "@/lib/locale";
import { ProductWithImage } from "@/types";

import { columns } from "./_components/columns";

export default async function page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const products = (await getProducts({
    include: {
      images: true,
    },
  })) as ProductWithImage[];
  const dict = await getDictionary(lang);
  const {
    pages: {
      dashboardProducts: { title, newProductButton },
    },
  } = dict;
  const hiddenOnSm = ["is_visible_to_user", "price", "quantity"];
  return (
    <div className="space-y-2 sm:space-y-4">
      <div className="flex justify-between items-center">
        <Heading type="h3" className="text-2xl sm:text-3xl">
          {title}
        </Heading>
        <Link href="/dashboard/products/new">
          <Button className="flex gap-2 items-center">
            <Icon render={PlusIcon} className="w-4 h-4" />
            <span>{newProductButton}</span>
          </Button>
        </Link>
      </div>
      <DataTable data={products} columns={columns} hiddenOnSm={hiddenOnSm} />
    </div>
  );
}
