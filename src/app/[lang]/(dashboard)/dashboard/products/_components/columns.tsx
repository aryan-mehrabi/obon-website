"use client";

import { ColumnDef, Row } from "@tanstack/react-table";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

import { deleteProduct } from "@/actions/product";
import Image from "@/components/atoms/Image";
import { DataTableColumnHeader } from "@/components/molecules/DataTableColumnHeader";
import { DataTableRowActions } from "@/components/molecules/DataTableRowActions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { formatNumber } from "@/lib/utils";
import { ProductWithImage } from "@/types";

import DataTableSwitch from "./DataTableSwitch";

function ProductActions({ row }: { row: Row<ProductWithImage> }) {
  const { toast } = useToast();
  const router = useRouter();
  const onEdit = (id: number) => {
    router.push(`/dashboard/products/${id}/edit`);
  };

  const onDelete = async (id: number) => {
    const res = await deleteProduct(id);
    if (res.success) {
      toast({ title: "Product deleted Successfully" });
    } else {
      toast({ title: res.message, variant: "destructive" });
    }
  };
  return <DataTableRowActions row={row} onEdit={onEdit} onDelete={onDelete} />;
}

export const columns: ColumnDef<ProductWithImage>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected()
          || (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "id",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Product Id" />
    ),
    cell: ({ row }) => {
      const id: number = row.getValue("id");
      return (
        <Link href={`/product/${id}`} className="w-[40px]">
          <Button variant="link">
            #
            {id}
          </Button>
        </Link>
      );
    },
    enableSorting: true,
    enableHiding: false,
  },
  {
    accessorKey: "title_en",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      const image = row.original.images.find((img) => img.is_default);
      return (
        <div className="flex gap-2 items-center">
          <div className="h-14 w-24 hidden sm:block">
            <Image
              src={image?.url}
              width={image?.width}
              height={image?.height}
              alt={image?.alt || "product image"}
              className="w-full h-full object-cover"
            />
          </div>
          <p className="max-w-[500px] truncate font-medium">
            {row.getValue("title_en")}
          </p>
        </div>
      );
    },
  },
  {
    accessorKey: "quantity",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Quantity" />
    ),
    cell: ({ row }) => <div>{row.getValue("quantity")}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "price",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Price" />
    ),
    cell: ({ row }) => <div>{formatNumber(row.getValue("price"))}</div>,
    enableSorting: true,
    enableHiding: true,
  },
  {
    accessorKey: "is_visible_to_user",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Visibility" />
    ),
    cell: ({ row }) => <DataTableSwitch row={row} />,
    enableSorting: true,
    enableHiding: true,
  },
  // {
  //   accessorKey: "status",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Status" />
  //   ),
  //   cell: ({ row }) => {
  //     const status = statuses.find(
  //       (status) => status.value === row.getValue("status"),
  //     );

  //     if (!status) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex w-[100px] items-center">
  //         {status.icon && (
  //           <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{status.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  // {
  //   accessorKey: "priority",
  //   header: ({ column }) => (
  //     <DataTableColumnHeader column={column} title="Priority" />
  //   ),
  //   cell: ({ row }) => {
  //     const priority = priorities.find(
  //       (priority) => priority.value === row.getValue("priority"),
  //     );

  //     if (!priority) {
  //       return null;
  //     }

  //     return (
  //       <div className="flex items-center">
  //         {priority.icon && (
  //           <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
  //         )}
  //         <span>{priority.label}</span>
  //       </div>
  //     );
  //   },
  //   filterFn: (row, id, value) => {
  //     return value.includes(row.getValue(id));
  //   },
  // },
  {
    id: "actions",
    cell: ProductActions,
  },
];
