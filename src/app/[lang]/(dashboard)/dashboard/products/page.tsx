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

import { columns } from "./columns";
import Wizard from "./Wizard";

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
      dashboardProducts: { newProduct, title },
    },
  } = dict;

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Heading type="h3">{title}</Heading>
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <Icon render={PlusIcon} className="w-4 h-4" />
              <p>{newProduct}</p>
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Product Information</DialogTitle>
            </DialogHeader>
            <Wizard />
          </DialogContent>
        </Dialog>
      </div>
      <DataTable data={products} columns={columns} />
    </div>
  );
}
