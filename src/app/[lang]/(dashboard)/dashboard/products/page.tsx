import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import Heading from "@/components/atoms/Heading";
import Icon from "@/components/atoms/Icon";
import { DataTable } from "@/components/organs/DataTable";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
      dashboardProducts: { newProductButton, title, newProductModal },
    },
  } = dict;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Heading type="h3">{title}</Heading>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="flex gap-2 items-center">
              <Icon render={PlusIcon} className="w-4 h-4" />
              <span>{newProductButton}</span>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{newProductModal.title}</DialogTitle>
            </DialogHeader>
            <Wizard dict={dict} />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable data={products} columns={columns} />
    </div>
  );
}
