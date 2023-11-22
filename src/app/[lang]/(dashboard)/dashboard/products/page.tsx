import { PlusIcon } from "@radix-ui/react-icons";
import React from "react";

import Heading from "@/components/atoms/Heading";
import Icon from "@/components/atoms/Icon";
import { DataTable } from "@/components/organs/DataTable";
import { Button } from "@/components/ui/button";
import prisma from "@/prisma/client";

import { columns } from "./columns";

export default async function page() {
  const products = await prisma.product.findMany({
    include: {
      images: true,
    },
  });

  return (
    <div className="space-y-4">
      <div className="flex justify-between">
        <Heading type="h3">Products</Heading>
        <Button>
          <Icon render={PlusIcon} className="w-4 h-4" />
          <p>New Product</p>
        </Button>
      </div>
      <DataTable data={products} columns={columns} />
    </div>
  );
}
