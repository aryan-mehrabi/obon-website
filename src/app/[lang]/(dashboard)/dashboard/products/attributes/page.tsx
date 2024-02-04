import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import Heading from "@/components/atoms/Heading";
import Icon from "@/components/atoms/Icon";
import { DataTable } from "@/components/organs/DataTable";
import { Button } from "@/components/ui/button";
import { getAttributes } from "@/data/product";
import { getDictionary, Locale } from "@/lib/locale";

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
  return (
    <div className="space-y-2 sm:space-y-4">
      <div className="flex justify-between">
        <Heading type="h1">{title}</Heading>
        <Button className="flex gap-2 items-center">
          <Icon render={PlusIcon} className="w-4 h-4" />
          <span>{newAttributeButton}</span>
        </Button>
      </div>
      <DataTable columns={columns} data={attributes} />
    </div>
  );
}
