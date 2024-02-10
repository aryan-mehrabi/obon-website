import { Locale } from "@prisma/client";
import { PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import Heading from "@/components/atoms/Heading";
import Icon from "@/components/atoms/Icon";
import { DataTable } from "@/components/organs/DataTable";
import TranslationProvider from "@/components/providers/TranslationProvider";
import { Button } from "@/components/ui/button";
import { getCategories } from "@/data/product";
import { getDictionary } from "@/lib/locale";

import { columns } from "./_components/columns";

export default async function Page({
  params: { lang },
}: {
  params: { lang: Locale };
}) {
  const [categories, dict] = await Promise.all([
    getCategories(),
    getDictionary(lang),
  ]);
  const {
    pages: {
      dashboardCategories: { title, newCategoryButton },
    },
  } = dict;

  const hiddenOnSm = ["required", "locale", "key"];

  return (
    <TranslationProvider dictionary={dict}>
      <div className="space-y-2 sm:space-y-4">
        <div className="flex justify-between items-center">
          <Heading type="h1">{title}</Heading>
          <Link href="/dashboard/products/categories/new">
            <Button className="flex gap-2 items-center">
              <Icon render={PlusIcon} className="w-4 h-4" />
              <span>{newCategoryButton}</span>
            </Button>
          </Link>
        </div>
        <DataTable
          columns={columns}
          data={categories}
          hiddenOnSm={hiddenOnSm}
        />
      </div>
    </TranslationProvider>
  );
}
