import React from "react";

import Heading from "@/components/atoms/Heading";
import { DataTable } from "@/components/organs/DataTable";
import { getDictionary, Locale } from "@/lib/locale";
import prisma from "@/prisma/client";

import { columns } from "./_components/columns";
import Wizard from "./_components/Wizard";

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
      dashboardProducts: { title },
    },
  } = dict;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Heading type="h3">{title}</Heading>
        <Wizard dict={dict} />
      </div>
      <DataTable data={products} columns={columns} />
    </div>
  );
}
