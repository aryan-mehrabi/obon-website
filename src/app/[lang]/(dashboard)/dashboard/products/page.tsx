import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import Heading from "@/components/atoms/Heading";
import Icon from "@/components/atoms/Icon";
import { DataTable } from "@/components/organs/DataTable";
import { Button } from "@/components/ui/button";
import { getDictionary, Locale } from "@/lib/locale";
import prisma from "@/prisma/client";

import { columns } from "./_components/columns";

export default async function page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });
  const dict = await getDictionary(lang);
  const {
    pages: {
      dashboardProducts: { title, newProductButton },
    },
  } = dict;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Heading type="h3">{title}</Heading>
        <Link href="/dashboard/products/new">
          <Button className="flex gap-2 items-center">
            <Icon render={PlusIcon} className="w-4 h-4" />
            <span>{newProductButton}</span>
          </Button>
        </Link>
      </div>
      <DataTable data={products} columns={columns} />
    </div>
  );
}

export const dynamic = "force-dynamic";
