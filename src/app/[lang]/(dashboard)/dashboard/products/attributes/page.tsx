import { Locale } from "@prisma/client";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import Heading from "@/components/atoms/Heading";
import Icon from "@/components/atoms/Icon";
import { DataTable } from "@/components/organs/DataTable";
import TranslationProvider from "@/components/providers/TranslationProvider";
import { Button } from "@/components/ui/button";
import { getAttributes } from "@/data/product";
import { getDictionary } from "@/lib/locale";

import { columns } from "./_components/columns";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const [attributes, dict] = await Promise.all([
    getAttributes(),
    getDictionary(lang),
  ]);
  const {
    pages: {
      dashboardAttributes: { title, newAttributeButton },
    },
  } = dict;

  const hiddenOnSm = ["required", "locale", "key"];

  return (
    <TranslationProvider dictionary={dict}>
      <div className="space-y-2 sm:space-y-4">
        <div className="flex justify-between items-center">
          <Heading type="h1">{title}</Heading>
          <Link href="/dashboard/products/attributes/new">
            <Button className="flex gap-2 items-center">
              <Icon render={PlusIcon} className="w-4 h-4" />
              <span>{newAttributeButton}</span>
            </Button>
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={attributes}
          hiddenOnSm={hiddenOnSm}
        />
      </div>
    </TranslationProvider>
  );
}
